import React, { Component } from "react";

const TILE_SIZE = 8;

class SceneCollisions extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  componentDidMount() {
    this.draw();
  }

  componentDidUpdate() {
    this.draw();
  }

  draw = () => {
    const { collisions, width, height } = this.props;
    if (this.canvas.current) {
      this.canvas.current.width = this.canvas.current.width; // Clear canvas
      const ctx = this.canvas.current.getContext("2d");
      ctx.fillStyle = "rgba(255,0,0,0.6)";
      for (let yi = 0; yi < height; yi++) {
        for (let xi = 0; xi < width; xi++) {
          const collisionIndex = width * yi + xi;
          const collisionByteIndex = collisionIndex >> 3;
          const collisionByteOffset = collisionIndex & 7;
          const collisionByteMask = 1 << collisionByteOffset;
          const wasCollision =
            collisions[collisionByteIndex] & collisionByteMask;
          if (wasCollision) {
            ctx.fillRect(xi * TILE_SIZE, yi * TILE_SIZE, TILE_SIZE, TILE_SIZE);
          }
        }
      }
    }
  };

  render() {
    const { width, height } = this.props;
    return (
      <div className="SceneCollisions">
        <canvas
          ref={this.canvas}
          width={width * TILE_SIZE}
          height={height * TILE_SIZE}
        />
      </div>
    );
  }
}

export default SceneCollisions;
