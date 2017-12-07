# Motherbeard Database Objects

## product
Returned from fetches to the newegg API. A `build` contains an array of these.

```
{
  "_id": "product_lenovo_9SIAE485VU6750",
  "_rev": "8-70b7e2d598f5df2cb36eda50198cd105",
  "advertiser-category": "Hard Drives",
  "buy-url": "http://www.anrdoezrs.net/click-8482857-11517614-1512046394785?url=https%3A%2F%2Fwww.newegg.com%2FProduct%2FProduct.aspx%3FItem%3D9SIAE485VU6750%26nm_mc%3DAFC-C8Junction-MKPL%26cm_mmc%3DAFC-C8Junction-MKPL-_-Hard%2BDrives-_-Lenovo-_-9SIAE485VU6750&cjsku=9SIAE485VU6750",
  "currency": "USD",
  "description": "Lenovo SSD 250GB 2.5%22 SAS 12Gb/s",
  "image-url": "https://images10.newegg.com/ProductImageCompressAll200/AE48_1_20170623529669774.jpg",
  "in-stock": "true",
  "isbn": "",
  "manufacturer-name": "Lenovo",
  "manufacturer-sku": "00NA685",
  "name": "Lenovo SSD 250GB 2.5\" SAS 12Gb/s",
  "price": "234.0",
  "sale-price": "234.0",
  "sku": "9SIAE485VU6750",
  "upc": "",
  "type": "product"
}
```

## template
Created by users or admins via the template form. Used to establish specifications when generating a `build`.

```
{
  "_id": "template_low_budget_desktop",
  "_rev": "2a01uie2d598f5df2cb36eda50198cd105",
  "name": "Low Budget Desktop",
  "build": [
    {
      "name": "motherboard",
      "keywords": "32gb",
      "maxMemory": "32gb",
      "low": "40",
      "high": "300"
    },
    {
      "name": "processor",
      "keywords": "2.8ghz dual",
      "socket": "fm2",
      "speed": "2.8ghz",
      "cores": "2",
      "low": "40",
      "high": "300"
    },
    {
      "name": "memory",
      "keywords": "16gb",
      "size": "16gb",
      "low": "20",
      "high": "300"
    },
    {
      "name": "storage",
      "keywords": "256gb ssd",
      "size": "256gb",
      "type": "ssd",
      "low": "20",
      "high": "300"
    },
    {
      "name": "video card",
      "keywords": "2gb",
      "size": "2gb",
      "low": "40",
      "high": "300"
    }
  ],
  "type": "template"
}
```

## build
A list of `product` ids created from a series of newegg API calls per the given `template`'s specfications.

```
{
  "_id": "build_low_budget_desktop",
  "_rev": "1-43a7e2d598f5df2cb36eda50198cd105",
  "name": "Low Budget Desktop",
  "templateId": "template_low_budget_desktop"
  "products": [
    "product_lenovo_9SIAE485VU6750",
    ...
  ],
  "type": "build"
}
```
