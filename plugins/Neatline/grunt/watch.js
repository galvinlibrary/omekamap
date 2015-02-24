
/**
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

module.exports = {

  payload: {
    files: [
      '<%= concat.add_form.src %>',
      '<%= concat.edit_form.src %>',
      '<%= concat.neatline_public.src %>',
      '<%= concat.neatline_editor.src %>',
      '<%= concat.jasmine_vendor.src %>',
      '<%= stylus.neatline_public.src %>',
      '<%= stylus.neatline_editor.src %>',
      '<%= stylus.exhibit_form.src %>',
    ],
    tasks: 'compile'
  }

};
