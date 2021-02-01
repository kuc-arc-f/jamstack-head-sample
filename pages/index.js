import React from 'react'

import Layout from '../components/layout'
import TopHeadBox from '../components/TopHeadBox'
import IndexRow from './IndexRow';
//
function Page(data) {
  // console.log(data.blogs)
    var items = data.blogs
    return (
    <Layout>
      <TopHeadBox />
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
            </div>
          </div>          
        </div>
      </div>
    </Layout>
    )
  }
  export const getStaticProps = async context => {
  //console.log( process.env.BASE_URL )
    var content = "test_6"
    var site_id = "60163322ee22c70d22a77687"
    const res = await fetch(
      process.env.BASE_URL + `/api/get/find?content=${content}&site_id=${site_id}`
    );
    const blogs = await res.json();
    const resCount = await fetch(
      process.env.BASE_URL + `/api/get/count?content=${content}&site_id=${site_id}`
    );
//    const jsonCount = await resCount.json();
//  console.log("count=", jsonCount.count)
    return {
      props : {
        blogs: blogs,
      }
    };
  }
  export default Page