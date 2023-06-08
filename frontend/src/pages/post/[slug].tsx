import groq from 'groq'
import imageUrlBuilder from '@sanity/image-url'
import { client } from '../../../client'

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

const Post = (props) => {
  const {
    title = 'Missing title',
    name = 'Missing name',
    categories,
    authorImage,
    mainImage,
  } = props.post

  return (
    <article>
      <h1 className='text-2xl font-semibold'>{title}</h1>

      {mainImage && (
        <div>
          <img src={urlFor(mainImage).width(300).url()} alt={title} />
        </div>
      )}

      <p className='text-xl'>Posted in</p>

      {categories && (
        <ul className='ml-2'>
          {categories.map((category) => (
            <li key={category}>{category}</li>
          ))}
        </ul>
      )}

      <span className='text-xl font-light'>By {name}</span>

      {authorImage && (
        <div>
          <img src={urlFor(authorImage).width(50).url()} alt={name} />
        </div>
      )}
    </article>
  )
}

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title, 
  "name": author->name, 
  "categories": categories[] -> title, 
  "authorImage": author->image,
  mainImage
  }`

/* IMPORTANT

getStaticProps and getStaticPaths work only in files in the pages folder
that are used for routing, i.e it will not be called for React components
that are included in these pages.

*/

/* GROQ syntax

• "*" 👈🏻 select all documents
• [_type == 'post' && slug.current == $slug] 👈🏻 filter the selection down
to documents with the type "post" and those of them who have the same slug
to that we have in the parameters
• [0] 👈🏻 select the first and only one in that list

*/

export async function getStaticPaths() {
  const paths = await client.fetch(
    `*[_type == "post" && defined(slug.current)][].slug.current`
  )

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  }
}

export async function getStaticProps(context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = '' } = context.params
  const post = await client.fetch(query, { slug })

  return {
    props: {
      post,
    },
  }
}

export default Post
