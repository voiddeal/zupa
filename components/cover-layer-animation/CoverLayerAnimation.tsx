import "./cover-layer-animation.css"

/* 
apply the CoverLayer as a direct child of its parent.
the container element must be position: relative;
*/

export default function CoverLayer() {
  return (
    <div className="cover-layer-container hide">
      <div className="cover-layer to-right follow active"></div>
    </div>
  )
}
