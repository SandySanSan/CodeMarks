import React, { Fragment } from 'react';
import { Grid, Header, Icon, Container } from 'semantic-ui-react';
import CardContent from './cards/CardContent';

const TagsContainer = ({ searchTagContent }) => {
  return (
    <Fragment>

      <Grid centered>
        <Grid.Row>
          <Container text>
            <Header as="h3" dividing>
              <Icon name="js square" color="yellow" />
              Javascript
              </Header>
          </Container>
        </Grid.Row>
        {searchTagContent.map(c => (
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
export default TagsContainer;
