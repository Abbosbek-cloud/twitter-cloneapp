import React from "react";
import AppHeader from "../AppHeader";
import PostAddForm from "../PostAddForm";
import PostList from "../PostList";
import PostStatusFilter from "../PostStatusFilter";
import SearchPanel from "../SearchPanel";

// importing css

import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 1,
          label: "Learn Reactive programming",
          important: true,
          like: false,
        },
        {
          id: 2,
          label: "JavaScript from 0 to HERO",
          important: false,
          like: false,
        },
        {
          id: 3,
          label: "HTML to React development",
          important: true,
          like: false,
        },
        {
          id: 4,
          label: "Web-programming concepts",
          important: false,
          like: false,
        },
        {
          id: 5,
          label: "Angular learning cons",
          important: false,
          like: false,
        },
      ],
      term: "",
      filter: "all",
    };

    this.deleteItem = this.deleteItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.onToggleImportant = this.onToggleImportant.bind(this);
    this.onToggleLiked = this.onToggleLiked.bind(this);
    this.onUpdateSearch = this.onUpdateSearch.bind(this);
    this.onStatusFilter = this.onStatusFilter.bind(this);

    this.maxId = 6;
  }

  deleteItem(id) {
    this.setState(({ data }) => {
      const index = data.findIndex((element) => element.id === id);

      // const before = data.splice(0, index);
      // const after = data.splice(index + 1);

      const newArr = [...data.slice(0, index), ...data.slice(index + 1)];

      return {
        data: newArr,
      };
      console.log(index);
    });
    console.log(id);
  }

  addItem(str) {
    const newItem = {
      label: str,
      important: false,
      id: this.maxId++,
    };

    this.setState(({ data }) => {
      const newArr = [...data, newItem];
      return {
        data: newArr,
      };
    });
    console.log(str);
  }

  onToggleImportant(id) {
    this.setState(({ data }) => {
      const index = data.findIndex((element) => element.id === id);

      const oldItem = data[index];

      const newItem = { ...oldItem, important: !oldItem.important };

      const newArr = [
        ...data.slice(0, index),
        newItem,
        ...data.slice(index + 1),
      ];

      return {
        data: newArr,
      };
    });
  }

  onToggleLiked(id) {
    this.setState(({ data }) => {
      const index = data.findIndex((element) => element.id === id);

      const oldItem = data[index];

      const newItem = { ...oldItem, like: !oldItem.like };

      const newArr = [
        ...data.slice(0, index),
        newItem,
        ...data.slice(index + 1),
      ];

      return {
        data: newArr,
      };
    });
  }

  searchPost(items, term) {
    if (term.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.label.indexOf(term) > -1;
    });
  }

  filterPost(items, filter) {
    if (filter === "like") {
      return items.filter((item) => item.like);
    } else {
      return items;
    }
  }

  onUpdateSearch(term) {
    this.setState({ term });
  }

  onStatusFilter(filter) {
    this.setState({ filter });
  }

  render() {
    const { term, data, filter } = this.state;
    const liked = this.state.data.filter((item) => item.like).length;
    const allPosts = data.length;

    const visiblePost = this.filterPost(this.searchPost(data, term), filter);
    return (
      <div className="app">
        <AppHeader liked={liked} allPosts={allPosts} />
        <div className="search-panel d-flex">
          <SearchPanel onUpdateSearch={this.onUpdateSearch} />
          <PostStatusFilter
            onStatusFilter={this.onStatusFilter}
            filter={filter}
          />
        </div>
        <PostList
          posts={visiblePost}
          onDelete={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleLiked={this.onToggleLiked}
        />
        <PostAddForm onAdd={this.addItem} />
      </div>
    );
  }
}
