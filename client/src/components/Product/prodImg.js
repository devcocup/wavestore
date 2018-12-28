import React, { Component } from 'react'

class ProductImg extends Component {

    state = {
        lightbox: false,
        imagePos: 0,
        lightboxImages: []
    }

    componentDidMount() {
        if(this.props.detail.images.length > 0){
            let lightBoxImages = [];

            this.props.detail.images.forEach(item => {
                lightBoxImages.push(item.url)
            });

            this.setState({
                lightBoxImages
            })
        }
    }

    renderCardImage = (images) => {
        if (images.length > 0){
            return images[0].url;
        } else {
            return `/images/image_not_availble.png`
        }
    }

    render() {
        const { detail } = this.props;
        return (
            <div className="product_image_container">
                <div className="main_pic">
                    <div
                        style={{
                            background: `url(${this.renderCardImage(detail.images)}) no-repeat`
                        }}
                    >

                    </div>
                </div>
            </div>
        )
    }
}

export default ProductImg;
