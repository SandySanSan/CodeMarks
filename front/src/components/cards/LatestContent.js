import React, { Fragment } from 'react';
import { List, Header } from 'semantic-ui-react';
import ListLatestContent from './ListLatestContent';


const LatestContent = ({ content }) => {
  const newestContent = content.sort((a, b) => new Date(b.dateCreation) - new Date(a.dateCreation));
  const lastest = newestContent.splice(0, 3);

  return (
    <Fragment>
      <Header as='h3' dividing>
        Derniers ajouts
    </Header>
      <List divided>
        {lastest.map(el => (
          <ListLatestContent
            type={el.type}
            title={el.title}
            id={el.id}
            link={el.link}
            dateCreation={el.dateCreation}
          />
        ))}
      </List>
    </Fragment>
  );
};

export default LatestContent;
