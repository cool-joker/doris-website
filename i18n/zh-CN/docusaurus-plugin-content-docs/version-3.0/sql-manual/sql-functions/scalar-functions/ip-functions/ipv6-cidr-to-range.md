---
{
"title": "IPV6_CIDR_TO_RANGE",
"language": "zh-CN"
}
---

<!-- 
Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at
  http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
-->

## IPV6_CIDR_TO_RANGE

IPV6_CIDR_TO_RANGE

## 描述

## 语法

`STRUCT<IPV6, IPV6> IPV6_CIDR_TO_RANGE(IPV6 ip_v6, INT16 cidr)`

接收一个IPv6和一个包含CIDR的Int16值。返回一个结构体，其中包含两个IPv6字段分别表示子网的较低范围（min）和较高范围（max）。

## 举例

```sql
mysql> SELECT ipv6_cidr_to_range(ipv6_string_to_num('2001:0db8:0000:85a3:0000:0000:ac1f:8001'), 32);
+---------------------------------------------------------------------------------------+
| ipv6_cidr_to_range(ipv6_string_to_num('2001:0db8:0000:85a3:0000:0000:ac1f:8001'), 32) |
+---------------------------------------------------------------------------------------+
| {"min": "2001:db8::", "max": "2001:db8:ffff:ffff:ffff:ffff:ffff:ffff"}                |
+---------------------------------------------------------------------------------------+

mysql> SELECT ipv6_cidr_to_range(to_ipv6('2001:0db8:0000:85a3:0000:0000:ac1f:8001'), 32);
+----------------------------------------------------------------------------+
| ipv6_cidr_to_range(to_ipv6('2001:0db8:0000:85a3:0000:0000:ac1f:8001'), 32) |
+----------------------------------------------------------------------------+
| {"min": "2001:db8::", "max": "2001:db8:ffff:ffff:ffff:ffff:ffff:ffff"}     |
+----------------------------------------------------------------------------+

mysql> SELECT ipv6_cidr_to_range(NULL, NULL);
+--------------------------------+
| ipv6_cidr_to_range(NULL, NULL) |
+--------------------------------+
| NULL                           |
+--------------------------------+
```

### Keywords

IPV6_CIDR_TO_RANGE, IP
