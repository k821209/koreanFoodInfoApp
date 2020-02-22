import React from 'react';
import logo from '../logo.svg';
import '../App.css';
import '../index.css';
import axios from "axios"
import ShowFood from "../routes/Foods"
import SimpleTable from "../routes/Food_materialui"
import {
  Header,
  Segment,
  Table,
  Pagination,
  Container,
  Grid,
} from 'semantic-ui-react';


const style = {
  h1: {
    marginTop: '3em',
  },
  h2: {
    margin: '4em 0em 2em',
  },
  h3: {
    marginTop: '2em',
    padding: '2em 0em',
  },
  last: {
    marginBottom: '300px',
  },
}

class Home extends React.Component {
  state = {
    isLoading: true,
    foodObjs: [],
    currentPage: 1
  }

  changePage = async (e, page) => {
    console.log('changePage', page.activePage)
    await this.setState({ currentPage: page.activePage })
    this.getFoods();
  }
  getFoods = async () => {
    const { currentPage } = this.state;
    console.log(currentPage)
    const {
      data: {
        response: {
          body: {
            items: { item }
          }
        }
      }
    }
      = await axios.get(`https://cors-anywhere.herokuapp.com/http://apis.data.go.kr/B551553/TradFoodInfoService/getFoodCateogryList?serviceKey=lLjoGCVK2fzZyHfHUXBIhIbHxQ8GhCmNpnKeFx4m4cfeUuneSaQMdhnxVeAcbN9CtEcRBnmMphI7zSwJL%2BJ7sg%3D%3D&pageNo=${currentPage}&numOfRows=10&type=JSON&SG_APIM=2ug8Dm9qNBfD32JLZGPN64f3EoTlkpD8kSOHWfXpyrY`)
    this.setState({ isLoading: false })
    // const foodNames = item.map(function(i){return i.foodNm})
    this.setState({ foodObjs: item })
  }
  componentDidMount() {
    this.getFoods();
  }
  render() {
    const { isLoading } = this.state
    const { foodObjs } = this.state
    console.log("example", foodObjs)
    return (
      <Container style={{ marginTop: '0.5em' }} textAlign="center" >
        <Segment>
          {isLoading ? "Loading..." : <SimpleTable foodObjs={foodObjs}/>}
        </Segment>
        <Pagination onPageChange={this.changePage} style={{ marginBottom: '1em' }} defaultActivePage={1} totalPages={353} />

      </Container>
    );
  }
}

export default Home;
