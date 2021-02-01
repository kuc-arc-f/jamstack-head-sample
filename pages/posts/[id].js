import React from 'react'
import Link from 'next/link';

import marked from  'marked'

import Layout from '../../components/layout'
//import LibCommon from '../libs/LibCommon'
//
export default function Page({ blog }) {
//  console.log(blog)
  var content = marked(blog.content)
  return (
    <Layout>
    <div className="container">
      <Link href="/" >
        <a className="btn btn-outline-primary mt-2">Back</a>
      </Link>
      <hr className="mt-2 mb-2" />
      <div className="show_head_wrap">
          <i className="fas fa-home"></i> >
          {blog.title}
      </div>
      <hr /> 
      <h1>{blog.title}</h1>
      Date: {blog.created_at}
      <hr />
      <div dangerouslySetInnerHTML={{__html: `${content}`}}></div>
      <hr />                 
    </div>
    <style>{`
      div#post_item > p > img{
        max-width : 100%;
        height : auto;
      }
      div#post_item > hr {
        height: 1px;
        background-color: #000;
        border: none;
      }
      .show_head_wrap{ font-size: 1.4rem; }
      `}</style>      
  </Layout>
  )
}
//
export const getStaticPaths = async () => {
  var content = "test_6"
  var site_id = "60163322ee22c70d22a77687"  
  const res = await fetch(
    process.env.BASE_URL + `/api/get/find?content=${content}&site_id=${site_id}`
  );
  const repos = await res.json();
  var paths = []
  repos.map((item, index) => {
    var row = { params: 
      { id: item.id } 
    }
    paths.push(row)
  })
// console.log(paths)
  return {
    paths: paths,
    fallback: false
  } 
};
export const getStaticProps = async context => {
  const postId = context.params.id
  const post = "po1"
// console.log("postId=" ,postId)
  var content = "test_6"
  var url = process.env.BASE_URL + `/api/get/findone?content=${content}&id=${postId}`
// console.log(url)
  const res = await fetch( url);
  const blog = await res.json();
//console.log(blog)
  return {
    props: { postId, post ,
      blog: blog
    },
  }
};


