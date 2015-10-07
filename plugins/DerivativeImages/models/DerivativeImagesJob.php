<?php
/**
 * Derivative Images Job
 * 
 * @copyright Copyright 2007-2012 Roy Rosenzweig Center for History and New Media
 * @license http://www.gnu.org/licenses/gpl-3.0.txt GNU GPLv3
 */

/**
 * @package Omeka\Plugins\DerivativeImages
 */
class DerivativeImagesJob extends Omeka_Job_AbstractJob
{
    /**
     * @var Omeka_Storage
     */
    protected $_storage;
    
    /**
     * @var Omeka_File_Derivative_Image_Creator
     */
    protected $_imageCreator;
    
    /**
     * @var array Valid derivative types
     */
    protected $_validDerivativeTypes = array('fullsize', 'thumbnail', 'square_thumbnail');
    
    /**
     * @var array Derivative types to create and their image size constraints
     */
    protected $_derivatives = array();
    
    /**
     * Construct this job.
     * 
     * Sets properties needed during the process.
     */
    public function __construct(array $options)
    {
        parent::__construct($options);
        
        // Set the storage.
        $this->_storage = Zend_Registry::get('storage');
        if (!($this->_storage->getAdapter() instanceof Omeka_Storage_Adapter_Filesystem)) {
            throw new Omeka_Storage_Exception(__('The storage adapter is not an instance of Omeka_Storage_Adapter_Filesystem.'));
        }

        // Set the image creator.
        try {
            $this->_imageCreator = Zend_Registry::get('file_derivative_creator');
        } catch (Zend_Exception $e) {
            throw new Omeka_File_Derivative_Exception(__('The ImageMagick directory path is missing.'));
        }

        // Set the configured derivative types and constraints.
        foreach ($this->_validDerivativeTypes as $type) {
            if (!is_array($this->_options['derivative_types']) 
                || in_array($type, $this->_options['derivative_types'])
            ) {
                $this->_derivatives[$type] = get_option("{$type}_constraint");
            }
        }
    }
    
    /**
     * Perform this job.
     */
    public function perform()
    {
        // Fetch file IDs according to the passed options.
        $select = $this->_db->select()
            ->from($this->_db->File, array('id'));
        if ('has_derivative' == $this->_options['process_type']) {
            $select->where('has_derivative_image = 1');
        } else if ('has_no_derivative' == $this->_options['process_type']) {
            $select->where('has_derivative_image = 0');
        }
        if (is_array($this->_options['mime_types'])) {
            $select->where('mime_type IN (?)', $this->_options['mime_types']);
        }
        $fileIds = $select->query()->fetchAll(Zend_Db::FETCH_COLUMN);
        
        // Iterate files and create derivatives.
        foreach ($fileIds as $fileId) {
            
            $file = get_record_by_id('file', $fileId);
            
            // Register which image derivatives to create.
            foreach ($this->_derivatives as $type => $constraint) {
                $this->_imageCreator->addDerivative($type, $constraint);
            }
            
            // Create derivatives.
            try {
                $imageCreated = $this->_imageCreator->create(
                    FILES_DIR . '/' . $file->getStoragePath('original'),
                    $file->getDerivativeFilename(),
                    $file->mime_type
                );
            } catch (Exception $e) {
                _log($e);
                $imageCreated = false;
            }
            
            // Confirm that the file was derivable.
            if (!$imageCreated) {
                continue;
            }
            
            // Save the file record.
            $file->has_derivative_image = 1;
            $file->save();
            
            // Delete existing derivative images and replace them with the 
            // temporary ones made during image creation above.
            foreach ($this->_derivatives as $type => $constraint) {
                $this->_storage->delete($file->getStoragePath($type));
                $source = FILES_DIR . "/original/{$type}_" . $file->getDerivativeFilename();
                $this->_storage->store($source, $file->getStoragePath($type));
            }
            
            // Release the file record to prevent memory leaks.
            release_object($file);
        }
    }
}
