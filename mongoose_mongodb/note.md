## MongoDB
    MongoDB是一个开源的NoSQL数据库 同时它也是一个对象数据库，没有固定的模式和结构
    所有的数据以文档的形式存储,数据格式就是JSON
    主键 是唯一标识 外键从别人家的主键中来

    
## Mongoose是什么
    Mongoose是MongoDB的一个对象模型工具
    同时它也是针对MongoDB操作的一个对象模型库,封装了MongoDB对文档的的一些增删改查等常用方法
    让NodeJS操作Mongodb数据库变得更加灵活简单
    
## Schema
    Schema是数据库集合的模型骨架
    定义了集合中的字段的名称和类型以及默认值等信息
    
## Model
    Model是由通过Schema构造而成
    除了具有Schema定义的数据库骨架以外，还可以操作数据库
    Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作,但Model比Entity可以实现的功能更多    
