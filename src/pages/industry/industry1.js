import React from 'react'
import { Link } from 'gatsby'
import { RichText } from 'prismic-dom'

import Layout from '../../components/layout'
var Prismic = require('prismic-javascript');

class Industry1Page extends React.Component {
  constructor() {
    super()

    this.state = {
      documents: ""
    }
  }
  componentDidMount() {
    this.getDocuments()
  }
  getDocuments = () => {
    var _that = this;
    Prismic.api("https://prismic-demo-website.prismic.io/api").then(function(api) {
      return api.query(Prismic.Predicates.at('document.type', 'page'));
    }).then(function(response) {
      console.log("Documents: ", response);
      var documents = response.results.map(doc => {
          return (
            <div key={doc.uid}>
              <h3>{doc.data.page.title.value[0].text}</h3>
              <img src={doc.data.page.image.value.main.url}/>
              <br/>
              <br/>
              <p>{doc.data.page.description.value[0].text}</p>
            </div>
          )
        })
      _that.setState({documents})
    }, function(err) {
      console.log("Something went wrong: ", err);
    });

  }
  render() {
    return (
      <Layout>
        {
          this.state.documents
        }
      </Layout>
    )
  }
}

export default Industry1Page
