import React, { Fragment } from 'react';
import { Grid, Header, Container } from 'semantic-ui-react';
import CardContent from './cards/CardContent';

const TagsContainer = ({ content, clef }) => {
  return (
    <Fragment>

      <Grid centered>
        <Grid.Row>
          <Container text>
            <Header as="h3" style={{ marginTop: '40px' }}>
              Résultats de recherche pour : {clef}
            </Header>
          </Container>
        </Grid.Row>
        {content.map(c => (
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
