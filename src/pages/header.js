import React from 'react';
import {
    Segment,
    Container,
    Header,
} from 'semantic-ui-react';
function headerTop() {
    return (
        <Container>
        <Segment inverted textAlign="center">
            <Header
                as="h1"
                content='한국전통음식데이터베이스'
                inverted color='yellow'
                style={{
                    fontFamily: 'Gulim',
                    fontSize: '3em',
                    fontWeight: '900',
                    marginBottom: '0.5em',
                    marginTop: '0.5em',
                }}
            />
        </Segment>
        </Container>)

}
export default headerTop;