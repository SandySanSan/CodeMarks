import React, { Fragment } from 'react';
import { Grid, Header, Container } from 'semantic-ui-react';
import CardContent from './cards/CardContent';

const TagsContainer = ({ searchTagContent, tag }) => {
  return (
    <Fragment>

      <Grid centered>
        <Grid.Row>
          <Container text>
            <Header as="h3" style={{ marginTop: '40px' }}>
              Résultats de recherche pour : {tag}
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
