<?php
/**
 * @package RestrictSearch
 */
 
class RestrictSearchPlugin extends Omeka_Plugin_AbstractPlugin
{   
    protected $_filters = array('search_element_texts');
    
    public function filterSearchElementTexts($elementTexts)
{

  foreach ($elementTexts as $index => $elementText) {
      
    $elementId = metadata($elementText, 'element_id');
    $skipElementIds = array(48); 
    if (in_array($elementId, $skipElementIds)) {        
        unset($elementTexts[$index]);
        return $elementTexts;
    }
  }
}
    

    
}