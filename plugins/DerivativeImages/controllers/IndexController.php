<?php
/**
 * Derivative Images
 * 
 * @copyright Copyright 2007-2012 Roy Rosenzweig Center for History and New Media
 * @license http://www.gnu.org/licenses/gpl-3.0.txt GNU GPLv3
 */

/**
 * The Derivative Images controller.
 * 
 * @package Omeka\Plugins\DerivativeImages
 */
class DerivativeImages_IndexController extends Omeka_Controller_AbstractActionController
{
    public function indexAction()
    {
        if ($this->getRequest()->isPost()) {
            $options = array('process_type' => $this->getParam('process_type'), 
                             'derivative_types' => $this->getParam('derivative_types'), 
                             'mime_types' => $this->getParam('mime_types'));
            Zend_Registry::get('bootstrap')->getResource('jobs')
                ->sendLongRunning('DerivativeImagesJob', $options);
            $this->_helper->flashMessenger(__('Processing files. This may take a while. You may continue administering your site.'), 'success');
        }
        
        $db = $this->_helper->db->getDb();
        $sql = "SELECT mime_type FROM $db->File GROUP BY mime_type";
        $this->view->mime_types = $db->fetchCol($sql);
    }
}
