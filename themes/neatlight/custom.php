<?php
/**
 * Custom php edits, embedded within comments -- see individual comments describing changes made
 * All surrounding code/comments retained as needed for functioning of custom php, unnecessary code/comments deleted, can be found in original file 
 */
 /** Edit #1 (from application/views/helpers/FileMarkup.php)
   * Edits likeToFile function to eliminate 'Undefined Function' error (see comment, line 67)
   AS
 */
 
/**
 * View Helper for displaying files through Omeka.
 * 
 * This will determine how to display any given file based on the MIME type 
 * (Internet media type) of that file. Individual rendering agents are defined 
 * by callbacks that are either contained within this class or defined by 
 * plugins. Callbacks defined by plugins will override native class methods if 
 * defined for existing MIME types. In order to define a rendering callback that 
 * should be in the core of Omeka, define a method in this class and then make 
 * sure that it responds to all the correct MIME types by modifying other 
 * properties in this class.
 * 
 * @package Omeka\View\Helper
 */
class Omeka_View_Helper_FileMarkup extends Zend_View_Helper_Abstract
{   
    /**
     * Array of MIME types and the callbacks that can process it.
     *
     * Example:
     * array('video/avi'=>'wmv');
     *
     * @var array
     */
    static protected $_callbacks = array();
    
    /**
     * Array of file extensions and the callbacks that can process them.
     * 
     * Taken from http://svn.apache.org/repos/asf/httpd/httpd/trunk/docs/conf/mime.types
     * 
     * @var array
     */
    static private $_fileExtensionCallbacks = array();
    
    /**
     * The array consists of the default options which are passed to the 
     * callback.
     *
     * @var array
     */
    static protected $_callbackOptions = array(
        'defaultDisplay'=>array(
            'linkToFile'=>true,
            'linkToMetadata'=>false,
            'linkText' => null, 
            ),
        'derivativeImage'=>array(
            'imageSize'=>'square_thumbnail',
            'linkToFile'=>true,
            'linkToMetadata'=>false,
            'imgAttributes' => array()
            ),
        );
    /**
     * AS removed ['linkAttributes'] in line 77
	 * line 77 (line 390 in original FileMarkup.php originally read as $html = link_to_file_show((array)$options['linkAttributes'],
     */
    protected function _linkToFile($file, $options, $html = null)
    {
        if ($html === null) {
            $fileTitle = strip_formatting(metadata($file, array('Dublin Core', 'Title')));
            $html = $fileTitle ? $fileTitle : metadata($file, 'Original Filename');
        }
        if ($options['linkToMetadata']) {
            $html = link_to_file_show((array)$options,
                  $html, $file);
        } else if (($linkToFile = $options['linkToFile'])) {
            // If you've manually specified a derivative type to link
            // to, and this file actually has derivatives, we'll use
            // that, otherwise, the link is to the "original" file.
            if (is_string($linkToFile) && $file->hasThumbnail()) {
                $derivative = $linkToFile;
            } else {
                $derivative = 'original';
            }
            // Wrap in a link that will download the file directly.
            $defaultLinkAttributes = array(
                'class'=>'download-file', 
                'href'=>$file->getWebPath($derivative)
                );
            $linkAttributes = array_key_exists('linkAttributes', $options)
                            ? $options['linkAttributes'] : array();
            $linkAttributes = array_merge($defaultLinkAttributes, $linkAttributes);
            $html = '<a ' . tag_attributes($linkAttributes) . '>' . $html . '</a>';
        }
        return $html;
    }
    
    /**
     * Returns valid XHTML markup for displaying an image that has been stored 
     * in Omeka.
     * 
     * @param File $file
     * @param array $file Options for customizing the display of images. Current
     * options include: 'imageSize'
     * @return string HTML for display
     */
    public function derivativeImage($file, array $options=array())
    {
        $html = '';
        $imgHtml = '';
        
        // Should we ever include more image sizes by default, this will be 
        // easier to modify.        
        $imgClasses = array(
            'thumbnail'=>'thumb', 
            'square_thumbnail'=>'thumb', 
            'fullsize'=>'full');
        $imageSize = $options['imageSize'];
        
        // If we can make an image from the given image size.
        if (in_array($imageSize, array_keys($imgClasses))) {
            
            // A class is given to all of the images by default to make it 
            // easier to style. This can be modified by passing it in as an 
            // option, but recommended against. Can also modify alt text via an 
            // option.
            $imgClass = $imgClasses[$imageSize];
            $imgAttributes = array_merge(array('class' => $imgClass),
                                (array)$options['imgAttributes']);
            $imgHtml = $this->image_tag($file, $imgAttributes, $imageSize);
        }
        $html .= !empty($imgHtml) ? $imgHtml : html_escape($file->original_filename);   
        $html = $this->_linkToFile($file, $options, $html);
        return $html;
    }
    // END DEFINED DISPLAY CALLBACKS
    
    protected function getCallback($file, $options)
    {
        $mimeType = $file->mime_type;
        $fileExtension = $file->getExtension();
        
        // Displaying icons overrides the default lookup mechanism.
        if (array_key_exists('icons', $options) and
                array_key_exists($mimeType, $options['icons'])) {
            return 'icon';
        }
        
        if (array_key_exists($mimeType, self::$_callbacks)) {
            $name = self::$_callbacks[$mimeType];
        } else if (array_key_exists($fileExtension, self::$_fileExtensionCallbacks)) {
            $name = self::$_fileExtensionCallbacks[$fileExtension];
        } else if ($file->hasThumbnail()) {
            $name = 'derivativeImage';
        } else {
            $name = 'defaultDisplay';
        }
        
        return $name;
    }
    
    /**
     * @see Omeka_Plugin_Broker::addMediaAdapter()
     * @param mixed $callback
     * @return array
     */
    protected function getDefaultOptions($callback)
    {
        $key = self::_getCallbackKey($callback);
        if (array_key_exists($key, self::$_callbackOptions)) {
            return (array) self::$_callbackOptions[$key];
        } else {
            return array();
        }
    }
    
    /**
     * Retrieve the HTML for a given file from the callback.   
     * 
     * @param File $file
     * @param callback $renderer Any valid callback that will display the HTML.
     * @param array $options Set of options passed to the rendering callback.
     * @return string HTML for displaying the file.
     */
    protected function getHtml($file, $renderer, array $options)
    {
        //Format the callback based on whether we can actually run it
        
        //If the callback is native to this object, get it valid and run it
        if(is_string($renderer) and method_exists($this, $renderer)) {
            $renderer = array($this, $renderer);
        }
        
        return call_user_func_array($renderer, array($file, $options));
    }
    
    /**
     * Bootstrap for the helper class.  This will retrieve the HTML for
     * displaying the file and by default wrap it in a <div class="item-file">.
     * 
     * @param File $file
     * @param array $props Set of options passed by a theme writer to the
     * customize the display of any given callback.
     * @param array $wrapperAttributes
     * @return string HTML
     */
    public function fileMarkup($file, array $props=array(), $wrapperAttributes = array())
    {        
        // There is a chance that $props passed in could modify the callback
        // that is used.  Currently used to determine whether or not to display
        // an icon.
        $callback = $this->getCallback($file, $props);   
        
        $options = array_merge($this->getDefaultOptions($callback), $props);
        
        $html  = $this->getHtml($file, $callback, $options);
        
        // Append a class name that corresponds to the MIME type.
        if ($wrapperAttributes) {
            $mimeTypeClassName = str_ireplace('/', '-', $file->mime_type);
            if (array_key_exists('class', $wrapperAttributes)) {
                $wrapperAttributes['class'] .= ' ' . $mimeTypeClassName;
            } else {
                $wrapperAttributes['class']  = $mimeTypeClassName;
            }
        }
        
        //Wrap the HTML in a div with a class (if class is not set to null)
        $wrapper = !empty($wrapperAttributes) ? '<div ' . tag_attributes($wrapperAttributes) . '>' : ''; 
        $html = !empty($wrapper) ? $wrapper . $html . "</div>" : $html;
        
        return apply_filters(
            'file_markup', 
            $html, 
            array(
                'file' => $file, 
                'callback' => $callback, 
                'options' => $options, 
                'wrapper_attributes' => $wrapperAttributes, 
            )
        );
    }
        
    /**
     * Return a valid img tag for an image.
     *
     * @param File|Item $record
     * @param array $props
     * @param string $format
     * @return string
     */
    public function image_tag($record, $props, $format)
    {
        if (!$record) {
            return false;
        }
        
        if ($record instanceof File) {
            $filename = $record->getDerivativeFilename();
            $file = $record;
        } else if ($record instanceof Item) {
            $item = $record;
            $file = get_db()->getTable('File')->getRandomFileWithImage($item->id);
            if (!$file) {
                return false;
            }
            $filename = $file->getDerivativeFilename();
        } else {
            // throw some exception?
            return '';
        }
        
        if ($file->hasThumbnail()) {
            $uri = html_escape($file->getWebPath($format));
        } else {
            $uri = img($this->_getFallbackImage($file));
        }
        
        /** 
         * Determine alt attribute for images
         * Should use the following in this order:
         * 1. alt option 
         * 2. file description
         * 3. file title 
         * 4. item title
         */
        $alt = '';
        if (isset($props['alt'])) {
            $alt = $props['alt'];
        } else if ($fileTitle = metadata($file, 'display title')) {
            $alt = $fileTitle;
        }
        $props['alt'] = $alt;
        
        $title = '';
        if (isset($props['title'])) {
            $title = $props['title'];
        } else {
            $title = $alt;
        }
        $props['title'] = $title;
        
        // Build the img tag
        $html = '<img src="' . $uri . '" '.tag_attributes($props) . '/>' . "\n";
        
        return $html;
    }
    /**
     * Get the name of a fallback image to use for this file.
     *
     * The fallback used depends on the file's mime type.
     *
     * @see self::addFallbackImage()
     * @param File $file The file to get a fallback for.
     * @return string Name of the image to use.
     */
    protected function _getFallbackImage($file)
    {
        $mimeType = $file->mime_type;
        if (isset(self::$_fallbackImages[$mimeType])) {
            return self::$_fallbackImages[$mimeType];
        }
        $mimePrefix = substr($mimeType, 0, strpos($mimeType, '/'));
        if (isset(self::$_fallbackImages[$mimePrefix])) {
            return self::$_fallbackImages[$mimePrefix];
        }
        return self::GENERIC_FALLBACK_IMAGE;
    }
    /**
     * Get a string key to represent a given callback.
     *
     * This key can be used to store and retrieve data about the
     * callback, like default options.
     *
     * @param callback $callback
     * @return string
     */
    protected static function _getCallbackKey($callback)
    {
        if (is_string($callback)) {
            return $callback;
        } else if (is_callable($callback, false, $name)) {
            return $name;
        } else {
            throw new InvalidArgumentException('Invalid file display callback.');
        }
    }
}
/* END Edit #1 (from application/views/helpers/FileMarkup.php) */