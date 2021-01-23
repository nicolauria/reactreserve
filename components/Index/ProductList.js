import { Card } from 'semantic-ui-react';

function ProductList({ products }) {
  function mapProductsToItems(products) {
    return products.map(prod => ({
      header: prod.name,
      image: prod.mediaUrl,
      meta: `$${prod.price}`,
      color: 'teal',
      fluid: true,
      childKey: prod._id,
      href: `/product?_id=${prod._id}`
    }))
  }

  return <Card.Group items={mapProductsToItems(products)} itemsPerRow="3" centered stackable />;
}

export default ProductList;
