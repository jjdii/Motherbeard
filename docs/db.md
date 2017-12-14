# Motherbeard Database Objects Reference

## Product object
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

## Template object
Created by users or admins via the template form. Used to establish specifications when generating a `build`.

```
{
  "_id": "template_cheap_windows_desktop",
  "_rev": "2-a01uie2d598f5df2cb36eda50198cd105",
  {
    "name": "Cheap Windows Desktop",
    "build": [
      {
        "name": "motherboard",
        "keywords": "64gb intel",
        "maxMemory": "64gb",
        "low": "40",
        "high": "150"
      },
      {
        "name": "processor",
        "keywords": "3.5ghz intel",
        "low": "80",
        "high": "200"
      },
      {
        "name": "memory",
        "keywords": "16gb",
        "size": "16gb",
        "low": "70",
        "high": "200"
      },
      {
        "name": "storage",
        "keywords": "500gb ssd",
        "size": "500gb",
        "type": "ssd",
        "low": "150",
        "high": "300"
      },
      {
        "name": "video card",
        "keywords": "2gb",
        "size": "2gb",
        "low": "40",
        "high": "100"
      }
    ]
  },
  "type": "template"
}
```

## Build object
A list of `product`(s) created from a series of newegg API calls per the given `template`'s specfications.

```
{
  "_id": "build_low_budget_desktop",
  "_rev": "1-43a7e2d598f5df2cb36eda50198cd105",
  "name": "Low Budget Desktop",
  "templateId": "template_low_budget_desktop"
  "products": [
    {
      "_id": "product_lenovo_9SIAE485VU6750",
      "type": "motherboard",
      "price": "74.99"
    },
    {
      "_id": "product_intel_9SIA1K66641140",
      "type": "processor",
      "price": "91.90"
    },
    ...
  ],
  "type": "build",
  "price": "412.88"
}
```

## Default products object
Reliable `product`(s) to be used in case no viable products were found when calling the newegg API.
```
{
  "_id": "default_products",
  "_rev": "2-51c0a8280c588789ca00788b805a37f5",
  "products": [
    {
      "type": "motherboard",
      "_id": "product_gigabyte_9SIABVR6D44128",
      "upc": "889523002414"
    },
    {
      "type": "processor",
      "_id": "product_intel_9SIA1K66641140",
      "upc": "735858329620"
    },
    {
      "type": "memory",
      "_id": "product_g.skill_N82E16820231963",
      "upc": "848354016496"
    },
    {
      "type": "video card",
      "_id": "product_xfx_9SIA98C6DK4218",
      "upc": "778656057319"
    },
    {
      "type": "storage",
      "_id": "product_seagate_9SIA85V5NR7804",
      "upc": "763649117835"
    },
    {
      "type": "case",
      "_id": "product_cooler_master_N82E16811119274",
      "upc": "884102021862"
    },
    {
      "type": "power supply",
      "_id": "product_seasonic_usa_N82E16817151086",
      "upc": "882016000713"
    },
    {
      "type": "network adapter",
      "_id": "product_tp-link_9SIA85V3E25190",
      "upc": "845973050603"
    },
    {
      "type": "optical drive",
      "_id": "product_lite-on_N82E16827106276",
      "upc": "4718390002387"
    }
  ]
}
```
