import React, { Fragment } from 'react';
import { Grid, Header, Icon, Container } from 'semantic-ui-react';
import CardContent from './CardContent';
import LatestContent from './LatestContent';

const CardsContainer = ({ content }) => {
  const contentReact = content.filter(el => el.tagsNames.includes('React'));
  const contentJs = content.filter(el => el.tagsNames.includes('Javascript'));
  console.log(contentReact)
  return (
    <Fragment>
      <Grid centered>
        <Grid.Row>
          <Grid.Column width={11} floated='left'>
            <div style={{ margin: '40px' }}>
              <Header as='h3' dividing>
                Derniers ajouts
              </Header>
              <LatestContent
                content={content}
              />
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Container text>
            <Header as='h4' dividing>
              <Icon name='react' color='teal' />
              React
              </Header>
          </Container>
        </Grid.Row>
        {contentReact.splice(0, 4).map(c => (
          <Grid.Column width={7}>
            <CardContent
              key={`${c.title}-${c.idcontent}`}
              link={c.link}
              tags={c.tagsNames}
              color={c.color}
              id={c.idcontent}
              title={c.title}
            />
          </Grid.Column>
        ))}

        <Grid.Row>
          <Container text>
            <Header as='h4' dividing>
              <Icon name='js square' color='yellow' />
              Javascript
              </Header>
          </Container>
        </Grid.Row>
        {contentJs.splice(0, 4).map(c => (
          <Grid.Column width={7}>
            <CardContent
              key={`${c.title}-${c.idcontent}`}
              link={c.link}
              tags={c.tagsNames}
              color={c.color}
              id={c.idcontent}
              title={c.title}
            />
          </Grid.Column>
        ))}

      </Grid>
    </Fragment>
  );
};
export default CardsContainer;
