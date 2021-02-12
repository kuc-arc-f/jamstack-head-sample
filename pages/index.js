import React from 'react'
import Head from 'next/head';

import Layout from '../components/layout'
import TopHeadBox from '../components/TopHeadBox'
import PagingBox from '../components/PagingBox'
import LibCommon from '../libs/LibCommon'
import LibPagenate from '../libs/LibPagenate'
import IndexRow from './IndexRow';
//
function Page(data) {
    var items = data.blogs
    var paginateDisp = data.display    
//console.log( items )
    return (
    <Layout>
      <Head><title key="title">{data.site_name}</title></Head>      
      <TopHeadBox site_name={data.site_name} />
      <div className="body_main_wrap">
        <div className="container">
          <div className="body_wrap">
            <div id="post_items_box" className="row conte mt-2 mb-4">
              <div className="col-sm-12">
                <div id="div_news">
                  <h2 className="h4_td_title mt-2 mb-2" >Post</h2>
                </div>
              </div>
              {items.map((item, index) => {
//                console.log(item.id ,item.createdAt )
                return (<IndexRow key={index}
                        id={item.id} title={item.title}
                        date={item.created_at} />       
                )
              })}
              <PagingBox page="1" paginateDisp={paginateDisp} />
            </div>
          </div>          
        </div>
      </div>
    </Layout>
    )
  }
  export const getStaticProps = async context => {
//console.log( process.env.site_id )
    var content = "posts"
    var site_id = process.env.MY_SITE_ID
    var url = process.env.BASE_URL+`/api/get/find?content=${content}&site_id=${site_id}`
    url += `&skip=0&limit=10`    
    const res = await fetch(url
    );
    var blogs = await res.json();
    blogs = LibCommon.convert_items(blogs)
    LibPagenate.init()
    var display = LibPagenate.is_paging_display(blogs.length)          
    return {
      props : {
        blogs: blogs,
        site_name : process.env.MY_SITE_NAME,
        display: display,
      }
    };
  }
  export default Page