import styled from 'styled-components';

export const Works = styled('div')`
  margin: 10px;
  & > h3 {
    font-size: 18px;
    color: darkolivegreen;
    text-align: center;
    border-bottom: 2px solid;
    margin: 20px auto 0;
    padding: 5px 0;
    width: 200px;
  }
  & > button {
  }
`;
export const WorkItem = styled('div')`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #cacaca;
  padding: 10px 0;
  .a {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 1px solid #b3b3b3;
    padding: 5px;
    margin: 0 10px;
    & > * {
      width: 100%;
      height: 100%;
    }
  }
  .m {
    margin: 5px 0;
    flex: 1 1 auto;
    h3 {
      font-size: 20px;
      color: #508e56;
    }
    h4 {
      font-size: 17px;
      color: grey;
      margin: 5px 0;
    }
    .d {
      font-size: 13px;
      color: grey;
    }
    p {
      font-size: 15px;
      color: gray;
      margin: 5px 0;
    }
  }
`;
export const WorkForm = styled('form')`
  padding: 10px;
  margin: 20px;
  border: 1px solid #bebebe;
  & > div {
    display: flex;
    margin: 10px 0;
    align-items: center;
  }
  .e,
  .p,
  .ds {
    & > div {
      min-width: 50%;
    }
  }
  .d {
    & > div {
      margin: 0 10px;
    }
  }
  .b {
    span {
      button {
        margin: 5px;
      }
    }
  }
`;
