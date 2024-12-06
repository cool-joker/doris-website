---
{
    "title": "TRIM_IN",
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


## 描述

## 语法

`VARCHAR trim_in(VARCHAR str[, VARCHAR rhs])`


当没有 `rhs` 参数时，将参数 `str` 中右侧和左侧开始部分连续出现的空格去掉；当有 `rhs` 参数时，在字符串的两端查找并移除 `rhs` 字符集合中的任何字符（不考虑顺序）


## 举例

```sql
mysql> SELECT trim_in('   ab d   ') str;
+------+
| str  |
+------+
| ab d |
+------+

mysql> SELECT trim_in('ababccaab','ab') str;
+------+
| str  |
+------+
| cc   |
+------+
```

## 关键词

TRIM_IN