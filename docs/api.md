##cj key
```
00abee535aa78b201092ab00e3af131a0b0630d36312e5b2ab204d8fa30238bcf9effc3d7f8aaa48a9146dab5b334bad7b7aa555c1278b034217d5d26785d575ad/0b259b7fe026f4003f12192fa9d52a3616c3a9a0ddc3c8aeb19c75b892d74ce128491f8c2b33032b3f0ffc97f65e188870f4d3f0fed7264e50f504a59348e7c1
```

##api header
`Authorization: [CJ KEY]`

##example api link
`https://product-search.api.cj.com/v2/product-search?website-id=4494766&advertiser-ids=joined&keywords=ssd`

##example api GET request
```
GET https://product-search.api.cj.com/v2/product-search?website-id=8482857&advertiser-ids=joined&keywords=ssd&sort-by=sale-price&records-per-page=100

Headers
Authorization: [CJ KEY]
```
##example api GET response
```
<?xml version="1.0" encoding="UTF-8"?>
<cj-api>
    <products total-matched="116581" records-returned="2" page-number="1">
        <product>
            <ad-id>11517614</ad-id>
            <advertiser-id>1807847</advertiser-id>
            <advertiser-name>Newegg.com</advertiser-name>
            <advertiser-category>Accessories - Storage Devices (Tape - Zip)</advertiser-category>
            <buy-url>http://www.jdoqocy.com/click-8482857-11517614-1512047673879?url=https%3A%2F%2Fwww.newegg.com%2FProduct%2FProduct.aspx%3FItem%3D9SIA76H3A25871%26nm_mc%3DAFC-C8Junction-MKPL%26cm_mmc%3DAFC-C8Junction-MKPL-_-Accessories%2B-%2BStorage%2BDevices%2B%28Tape%2B-%2BZip%29-_-General%2Bs-_-9SIA76H3A25871&amp;cjsku=9SIA76H3A25871</buy-url>
            <catalog-id>cjo:206</catalog-id>
            <currency>USD</currency>
            <description>2.5" SSD HDD To 3.5"  Notebook Hard Disk Mounting Adapter Bracket Dock Holder New</description>
            <image-url>https://images10.newegg.com/ProductImageCompressAll200/A76H_1_20150831521905121.jpg</image-url>
            <in-stock>true</in-stock>
            <isbn></isbn>
            <manufacturer-name>General's</manufacturer-name>
            <manufacturer-sku>SKU273683w</manufacturer-sku>
            <name>2.5" SSD HDD To 3.5"  Notebook Hard Disk Mounting Adapter Bracket Dock Holder New</name>
            <price>1.26</price>
            <retail-price></retail-price>
            <sale-price>1.26</sale-price>
            <sku>9SIA76H3A25871</sku>
            <upc></upc>
        </product>
        <product>
            <ad-id>12165498</ad-id>
            <advertiser-id>1807847</advertiser-id>
            <advertiser-name>Newegg.com</advertiser-name>
            <advertiser-category>Accessories - Storage Devices (Tape - Zip)</advertiser-category>
            <buy-url>http://www.tkqlhce.com/click-8482857-12165498-1512051861933?url=https%3A%2F%2Fwww.newegg.com%2FProduct%2FProduct.aspx%3FItem%3D9SIAASP40B2936%26nm_mc%3DAFC-C8Junction-MKPL%26cm_mmc%3DAFC-C8Junction-MKPL-_-Accessories%2B-%2BStorage%2BDevices%2B%28Tape%2B-%2BZip%29-_-General%2Bs-_-9SIAASP40B2936&amp;cjsku=9SIAASP40B2936</buy-url>
            <catalog-id>cjo:5693</catalog-id>
            <currency>USD</currency>
            <description>2.5" SSD HDD To 3.5"  Notebook Hard Disk Mounting Adapter Bracket Dock Holder New</description>
            <image-url>https://images10.newegg.com/ProductImageCompressAll200/A76H_1_20150831521905121.jpg</image-url>
            <in-stock>true</in-stock>
            <isbn></isbn>
            <manufacturer-name>General's</manufacturer-name>
            <manufacturer-sku>SKU273683w</manufacturer-sku>
            <name>2.5" SSD HDD To 3.5"  Notebook Hard Disk Mounting Adapter Bracket Dock Holder New</name>
            <price>1.29</price>
            <retail-price></retail-price>
            <sale-price>1.29</sale-price>
            <sku>9SIAASP40B2936</sku>
            <upc></upc>
        </product>
        ...
    </products>
</cj-api>
```
