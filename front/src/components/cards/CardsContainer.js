import React, { Fragment } from 'react';
import { Grid, Header, Icon, Container } from 'semantic-ui-react';
import CardContent from './CardContent';
import LatestContent from './LatestContent';

const CardsContainer = ({ content }) => {
  const contentReact = content.filter(el => el.tagsNames.includes('React'));
  const contentJs = content.filter(el => el.tagsNames.includes('Javascript'));
  return (
    <Fragment>
      <Grid centered>
        <Header as="h3" style={{ marginTop: '40px' }} textAlign='left'>
          Derniers ajouts
        </Header>
        <Grid.Row columns="equal">
          <Grid.Column textAlign="left" width={7}>
            <LatestContent
              content={content}
            />
          </Grid.Column>
          <Grid.Column textAlign="left" width={7}>
            <LatestContent
              content={content}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid centered>
        <Grid.Row style={{ marginTop: '45px' }}>
          <Container text>
            <Header as="h3" dividing>
              <Icon name="react" color="teal" />
              React
              </Header>
          </Container>
        </Grid.Row>
        {contentReact.splice(0, 4).map(c => (
          <Grid.Column width={7} key={c.idcontent}>
            <CardContent
              link={c.link}
              id={c.idcontent}
              title={c.title}
            />
          </Grid.Column>
        ))}

        <Grid.Row>
          <Container text>
            <Header as="h3" dividing>
              <Icon name="js square" color="yellow" />
              Javascript
              </Header>
          </Container>
        </Grid.Row>
        {contentJs.splice(0, 4).map(c => (
          <Grid.Column
            width={7}
            key={`${c.title}-${c.idcontent}`}
          >
            <CardContent
              link={c.link}
              tags={c.tagsNames}
              id={c.idcontent}
              title={c.title}
            />
          </Grid.Column>
        ))}

      </Grid>
    </Fragment >
  );
};
export default CardsContainer;
