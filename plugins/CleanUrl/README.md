Clean Url (plugin for Omeka)
============================

[Clean Url] is a plugin for [Omeka] that creates clean, readable and search
engine optimized URLs like `http://example.com/my_collection/dc:identifier`
instead of `http://example.com/items/show/internal_code`. Used identifiers come
from standard Dublin Core metadata, or from a specific field, so they are easy
to manage.

See the example of the digitized heritage of the library of [Mines ParisTech].


Installation
------------

Uncompress files and rename plugin folder "CleanUrl".

Then install it like any other Omeka plugin and follow the config instructions.


Usage
-----

Clean urls are automatically displayed in public theme and they are not used in
the admin theme. They are case insensitive.

### Identifiers ###

Simply set an identifier for each record in a field (`Dublin Core:Identifier` by
default). Recommended fields to use are `Dublin Core:Identifier` or an added
specific field. This field should be available for collections, items and files.

- A prefix can be added if you have other data in the same field.
- A record can have multiple identifiers. The first one will be used to set the
default url. Other ones can be used to set alias.
- If the same identifier is used for multiple records, only the first record can
be got. Currently, no check is done when duplicate identifiers are set.
- Reserved words like "collections", "items", "files", "exhibits", simple pages
slugs...) should not be used as identifiers, except if there is a part before
them (a main path, a collection identifier or a generic word).
- If not set, the identifier will be the default id of the record, except for
collections, where the original path will be used.
- To use numbers as identifier is possible but not recommended, except if all
records have got an identifier.
- Identifiers should be sanitized, else urls won't work.

### Structure of urls ###

The configuration page let you choose the structure of paths for collections,
items and files.

- A main path can be added , as "archives" or "library": `http://example.com/main_path/my_collection/dc:identifier`.
- A generic and persistent part can be added for collections, items and files,
for example `http://example.com/my_collections/collections_identifier`, or `http://example.com/document/item_identifier`.
- Multiple urls can be set, in particular to have a permalink and a search engine
optimized link.
- If multiple structures of urls are selected, a default one will be used to set
the default url. Other ones can be used to get records.

So the configuration of the plugin let you choose among these possible paths:

*Collections*

    - / :identifier_collection
    - / generic_collection / :identifier_collection
    - / main_path / :identifier_collection
    - / main_path / generic_collection / :identifier_collection

*Items*

    - / :identifier_item (currently not available)
    - / generic_item / :identifier_item
    - / :identifier_collection / :identifier_item
    - / generic_collection / :identifier_collection / :identifier_item
    - / main_path / :identifier_item
    - / main_path / generic_item / :identifier_item
    - / main_path / :identifier_collection / :identifier_item
    - / main_path / generic_collection / :identifier_collection / :identifier_item

*Files*

    - / :identifier_file (currently not available)
    - / :identifier_item / :identifier_file (currently not available)
    - / generic_file / :identifier_file
    - / generic_file / :identifier_item / :identifier_file
    - / :identifier_collection / :identifier_file
    - / generic_collection / :identifier_collection / :identifier_file
    - / :identifier_collection / :identifier_item / :identifier_file
    - / generic_collection / :identifier_collection / :identifier_item / :identifier_file
    - / main_path / :identifier_file
    - / main_path / :identifier_item / :identifier_file
    - / main_path / generic_file / :identifier_file
    - / main_path / generic_file / :identifier_item / :identifier_file
    - / main_path / :identifier_collection / :identifier_file
    - / main_path / generic_collection / :identifier_collection / :identifier_file
    - / main_path / :identifier_collection / :identifier_item / :identifier_file
    - / main_path / generic_collection / :identifier_collection / :identifier_item / :identifier_file

Note: only a logical combination of some of these paths are available together!

Use the plugin [Archive Repertory] if you wish to set similar paths for real
files (collection_identifier / item_identifier / true_filename).


Warning
-------

Use it at your own risk.

It's always recommended to backup your files and database regularly so you can
roll back if needed.


Troubleshooting
---------------

See online issues on the [Clean Url issues] page on GitHub.


License
-------

This plugin is published under the [CeCILL v2.1] licence, compatible with
[GNU/GPL] and approved by [FSF] and [OSI].

In consideration of access to the source code and the rights to copy, modify and
redistribute granted by the license, users are provided only with a limited
warranty and the software's author, the holder of the economic rights, and the
successive licensors only have limited liability.

In this respect, the risks associated with loading, using, modifying and/or
developing or reproducing the software by the user are brought to the user's
attention, given its Free Software status, which may make it complicated to use,
with the result that its use is reserved for developers and experienced
professionals having in-depth computer knowledge. Users are therefore encouraged
to load and test the suitability of the software as regards their requirements
in conditions enabling the security of their systems and/or data to be ensured
and, more generally, to use and operate it in the same conditions of security.
This Agreement may be freely reproduced and published, provided it is not
altered, and that no provisions are either added or removed herefrom.


Contact
-------

Current maintainers:

* Daniel Berthereau (see [Daniel-KM] on GitHub)

First version of this plugin has been built for [École des Ponts ParisTech].
The upgrade for Omeka 2.0 has been built for [Mines ParisTech].


Copyright
---------

* Copyright Daniel Berthereau, 2012-2014

Initially based on ItemId of Jim Safley (see [GitHub ItemId]).


[Clean Url]: https://github.com/Daniel-KM/CleanUrl
[Omeka]: http://www.omeka.org
[Clean Url issues]: https://github.com/Daniel-KM/CleanUrl/Issues
[Archive Repertory]: https://github.com/Daniel-KM/ArchiveRepertory
[CeCILL v2.1]: http://www.cecill.info/licences/Licence_CeCILL_V2.1-en.html
[GNU/GPL]: https://www.gnu.org/licenses/gpl-3.0.html
[FSF]: https://www.fsf.org
[OSI]: http://opensource.org
[Daniel-KM]: http://github.com/Daniel-KM "Daniel Berthereau"
[École des Ponts ParisTech]: http://bibliotheque.enpc.fr
[Mines ParisTech]: https://patrimoine.mines-paristech.fr
[GitHub ItemId]: https://github.com/jimsafley/ItemId
