import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import CategoryCaption from "./CategoryCaption";
import { getCurrentCategory } from "../actions";
//import { catPropsName } from "../containers/catPropsName";

/* const {
  name,
  caption,
  description,
  isPhotoAlbum,
  isTileGrid,
  isArticle
} = catPropsName; */

class Content extends React.Component {
  componentDidMount() {
    const { catNum, getCurCat } = this.props;
    // Вызываем при первой загрузке страницы, когда никаких данных еще не было
    getCurCat(catNum);
  }
  // Метод вызывается сразу после обновления, аргумент - предыдущее состояние
  componentDidUpdate(prevProps) {
    const { getCurCat, catNum } = this.props;
    // Сравниваем предыдущее состояние с текущим. Если не равны, то
    // делаем запрос на категорию. Когда придет ответ, состояния будут уже равны
    // и запрос больше не выполнится
    if (prevProps.catNum !== catNum) getCurCat(catNum);
  }
  render() {
    const { curCat, state } = this.props;
    return (
      <React.Fragment>
        {state === "success" ? (
          <div className="col-xl-12 col-lg-9 col-md-9 col-sm-9 ContentBlock">
            <CategoryCaption curCat={curCat[0]} />
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 no-gutters">
              Redux is a predictable state container for JavaScript apps. It
              helps you write applications that behave consistently, run in
              different environments (client, server, and native), and are easy
              to test. On top of that, it provides a great developer experience,
              such as live code editing combined with a time traveling debugger.
              You can use Redux together with React, or with any other view
              library. It is tiny (2kB, including dependencies), but has a large
              ecosystem of addons available.
            </div>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (store, ownProps) => {
  const { catNum } = ownProps.match.params;
  const { currentCategory } = store;
  return {
    catNum: catNum,
    curCat: currentCategory.items,
    state: currentCategory.state
    // При первой загрузке страницы, когда данные с сервера не пришли
    // catNum будет undefined, Redirect в index.js не сработает
    //catNum: !catNum ? 0 : catNum,
    //subCatNum: !subCatNum ? 0 : subCatNum
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCurCat: catNum => dispatch(getCurrentCategory(catNum))
  };
};

// Получаем данные из store. В нужном комопненте эти данные можно получить из props
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Content)
);
