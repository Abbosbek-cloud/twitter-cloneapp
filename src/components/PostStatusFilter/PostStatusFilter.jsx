import React from "react";

export default class PostStatusFilter extends React.Component {
  constructor(props) {
    super(props);
    this.buttons = [
      { name: "all", label: "All", cls: "btn btn-info" },
      { name: "like", label: "Liked", cls: "btn btn-outline-secondary" },
    ];
  }

  render() {
    const button = this.buttons.map(({ name, label, cls }) => {
      const active = this.props.filter === "name";
      return (
        <button
          key={name}
          className={cls}
          onClick={() => this.props.onStatusFilter(name)}
        >
          {label}
        </button>
      );
    });
    return <div className="btn-group">{button}</div>;
  }
}
