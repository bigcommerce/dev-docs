<h1>Blog Objects</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
		<li><a href="#blog_blog">Blog</a></li>
    <li><a href="#blog_blog-post">Blog Post</a></li>
	</ul>
</div>

<a href='#blog_blog' aria-hidden='true' class='block-anchor'  id='blog_blog'><i aria-hidden='true' class='linkify icon'></i></a>

_These objects are called on the default `<theme-name>/templates/components/blog/post.html` partial._

## Blog

**Description:** Blog-specific properties for the blog feature within BigCommerce storefronts 

**Handlebars Expression:** `{{blog}}`

**Object Properties:**

<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>name</td>
    <td>Blog name</td>
  </tr>
  <tr>
    <td>url</td>
    <td>Blog custom url</td>
  </tr>
  <tr>
    <td>pagination</td>
    <td>References pagination model</td>
  </tr>
  <tr>
    <td>posts </td>
    <td>A list of posts for the blog index; default sorting is by date_published,<br> from most-recent to earliest</td>
  </tr>
  <tr>
    <td><span class="indent1">author</span></td>
    <td>Author of the blog post</td>
  </tr>
  <tr>
    <td><span class="indent1">title</span></td>
    <td>Title of the blog post</td>
  </tr>
  <tr>
    <td><span class="indent1">url</span></td>
    <td>URL of the blog entry</td>
  </tr>
  <tr>
    <td><span class="indent1">body</span></td>
    <td>Body of the blog entry</td>
  </tr>
  <tr>
    <td><span class="indent1">thumbnail</span></td>
    <td>Image thumbnail for the blog entry, in <a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/stencil-image">Stencil image format</a></td>
  </tr>
  <tr>
    <td><span class="indent1">date_published</span></td>
    <td>Date the blog entry was published</td>
  </tr>
  <tr>
    <td><span class="indent1">social</span></td>
    <td>Social media tags for the blog entry</td>
  </tr>
  <tr>
    <td><span class="indent1">tags </span></td>
    <td>Tags for the blog</td>
  </tr>
  <tr>
    <td><span class="indent2">name</span></td>
    <td>Name for the tag</td>
  </tr>
  <tr>
    <td><span class="indent2">url</span></td>
    <td>URL for the tag</td>
  </tr>
</table>

<a href='#blog_blog-post' aria-hidden='true' class='block-anchor'  id='blog_blog-post'><i aria-hidden='true' class='linkify icon'></i></a>

## Blog Post

<b>Description:</b> Individual blog post object

<b>Handlebars Expression:</b> `{{blog.post}}`

<b>Object Properties:</b>

<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>author</td>
    <td>Author of the blog post</td>
  </tr>
  <tr>
    <td>title</td>
    <td>Title of the blog post</td>
  </tr>
  <tr>
    <td>url</td>
    <td>URL of the blog entry</td>
  </tr>
  <tr>
    <td>body</td>
    <td>Body of the blog entry</td>
  </tr>
  <tr>
    <td>thumbnail</td>
    <td>Image thumbnail for the blog entry, in <a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/stencil-image">Stencil image format</a></td>
  </tr>
  <tr>
    <td>date_published</td>
    <td>Date the blog entry was published</td>
  </tr>
  <tr>
    <td>social</td>
    <td>Social media tags for the blog entry</td>
  </tr>
  <tr>
    <td>tags </td>
    <td>Tags for the blog</td>
  </tr>
  <tr>
    <td><span class="indent1"> name</span></td>
    <td>Name for the tag</td>
  </tr>
  <tr>
    <td><span class="indent1"> url</span></td>
    <td>URL for the tag</td>
  </tr>
</table>

