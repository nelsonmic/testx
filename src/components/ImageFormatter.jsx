const ImageFormatter=(props)=>{
    return(
        <div className="image-formatter-container" style={{width:props.width, height:props.height}}>
            <img src={props.source} alt={props.alt} />
        </div>
    )
}

export default ImageFormatter