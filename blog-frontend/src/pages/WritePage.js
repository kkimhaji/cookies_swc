import React from 'react';
import Responsive from '../components/common/Responsive';
import EditorContainer from '../containers/write/EditorContainer';
import TagBoxContainer from '../containers/write/TagBoxContainer';
import WriteActionButtonsContainer from '../containers/write/WriteActionButtonsContainer';
import { Helmet } from 'react-helmet-async';

const WritePage = () => {
  return (
    <Responsive style={{marginLeft:0,marginRight:0}}>
      <Helmet>
        <title>글 작성하기 - COOKIES</title>
      </Helmet>
      <EditorContainer/>
      <TagBoxContainer/>
      <WriteActionButtonsContainer/>
    </Responsive>
  );
};

export default WritePage;
