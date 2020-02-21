//Detail 은 페이지. 
import { Link } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import { Label, Segment, Container, Message, MessageHeader } from 'semantic-ui-react';
const initialState = {
  foodCd: '',
  foodNm: '',
  foodObj: [],
  loaded: false,
}

class Detail extends React.Component {
  state = initialState
  getFoodDetail = async (foodCd, foodNm) => {
    this.setState({ foodCd: foodCd, foodNm: foodNm })
    const url = `/getFoodHealthOriMediList?serviceKey=lLjoGCVK2fzZyHfHUXBIhIbHxQ8GhCmNpnKeFx4m4cfeUuneSaQMdhnxVeAcbN9CtEcRBnmMphI7zSwJL%2BJ7sg%3D%3D&pageNo=1&numOfRows=10&foodCd=${foodCd}&type=JSON&SG_APIM=2ug8Dm9qNBfD32JLZGPN64f3EoTlkpD8kSOHWfXpyrY`
    console.log(foodCd, url)
    try {
      const { data: { response: { body: { items: { item } } } } } = await axios.get(url)
      console.log('loading')
      this.setState({ foodObj: item, loaded: true, foodCd: foodCd, foodNm: foodNm })

    }
    catch (e) {
      //const { location, history } = this.props;
      //history.push("/");
      console.log('getFoodDetail_error_1')
      this.setState({ loaded: false })

    }

  }

  componentDidUpdate(prevProps, prevState) {
    console.log('didupdate1')
    console.log('#', prevProps)
    console.log('#', this.props)
    const { location, history } = this.props;
    //console.log(location.state.foodCd,prevLocation.state.foodCd)
    if (location !== prevProps.location) {
      if (location.state === undefined) {
        history.push("/");
      }
      else {
        this.getFoodDetail(location.state.foodCd, location.state.foodNm);
      }
    }
  }

  componentDidMount() {
    console.log('didmount1')
    const { location, history } = this.props;
    const { update, foodCd, foodNm } = this.state;
    if (location.state === undefined) {
      history.push("/");
    }
    else {
      this.setState({
        foodCd: location.state.foodCd,
        foodNm: location.state.foodNm,
      })
      this.getFoodDetail(location.state.foodCd, location.state.foodNm);
      console.log('didmount2', this.state)
    }

  }

  /*
  API 정보 목록 # API이름을 써라. 
  foodCd: "100004"
  foodNm: "가물치국"
  institutionsNm: "한국한의학연구원"
  journalNm: "한의학고전DB"
  vol: "鄕藥集成方 卷第十七 > 水病論"
  year: "1433"
  articleNm: "향약집성방(鄕藥集成方)"
  author: "유효통, 노중례, 박윤덕 등 (兪孝通, 盧重禮, 朴允德 등)"
  pageStart: ""
  pageEnd: ""
  content: "鱧魚粥 治水腫, 利小便.↵가물치국 수종을 치료하는데 소변을 잘 보게 한다."
  etc: "85(30)"
*/
  showContent = (i) => {
    return (
      <div key={i.articleNm}>
        <Segment key={i.articleNm}>
          <p>{i.content}</p>
          <Label key={i.articleNm}>
            {i.articleNm}({i.vol}:{i.year}) provided by {i.journalNm}
          </Label>
        </Segment>
      </div>
    )
  }
  //changeQfood = (foodNm,foodCd) => {
  //  this.setState({foodCd:foodCd, foodNm:foodNm, update:false})

  //}  
  render() {
    let showText;
    const { update, foodCd, foodNm, foodObj, loaded } = this.state;
    console.log('render', this.state)
    if (loaded === true) {
      showText = <Message>
        <MessageHeader>
          {foodNm}({foodCd})
                    </MessageHeader><br></br>
        {foodObj.map(this.showContent)}
      </Message>
    } else {
      showText = <Message>
        <MessageHeader>
          {foodNm}({foodCd})
                    </MessageHeader><br></br>
        <p> 해당 정보가 데이터베이스에 없습니다.</p>
      </Message>
    }
    return (
      <Container style={{ marginTop: "0.5em" }}>
        <Segment><Link to={{
          pathname: `/details_science/${foodCd}/`,
          state: { foodCd, foodNm }
        }}>
          <span> </span><Label>학술정보</Label>
        </Link>
        </Segment>
        <Segment>
          {showText}
        </Segment>
      </Container>
    )
  }
}

export default Detail; 