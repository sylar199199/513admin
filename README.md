# 513 在线学习平台 Admin端
**gitlab 地址：http://120.78.7.115:8080/root/online-study-web-manage**<br/>
**仓库地址：http://120.78.7.115:8080/root/online-study-web-manage.git**
## 开始项目
1.  添加 ssh
2.  fork 项目
3.  ```git clone http://120.78.7.115:8080/<your gitlab name>/online-study-web-manage.git```
4.  ```git remote add upstream http://120.78.7.115:8080/root/online-study-web-manage.git```

## 工作流程:
本项目采用 fork工作流程，代码提交到自己 fork 的仓库，**请勿 clone 主仓库代码，并且提交代码！**

1. 必须在自己代码仓库、正确的分支上面开发，**请勿在 master 分支开发**
2. 完成工作之后提交代码至自己的代码仓库，并且提出 pr（合并请求)，请将合并请求提交到 feature 分支，**master 分支神圣不容侵犯！**
3. 主仓库代码更新之后，更新本地仓库以及自己本人 origin 仓库代码
4. ```git pull upstream <master/dev/feature>```
5. ```git push origin <master/dev/feature>```

开始:
1. ``` yarn install```
2. ``` git checkout -b <new branch>```
3. ```some code ......```
4. ```git add .```
5. ```git commit -m '[A]:<message>```
6. ```git checkout dev```
7. ```git merge <your work branch>```
8. ``` git push origin <dev>```
9. 提交合并请求至主仓库dev分支
10. 合并通过之后，```git pull upstream dev and git push oringin dev```
11. ``` git branch -d<-D> <your work branch>```

## git commit 规范
```git commit -m '<type>:<subject>'```
### type
用于说明 commit 的类别，只允许使用下面7个标识。
* feat：新功能（feature）
* fix：修补bug
* docs：文档（documentation）
* style： 格式（不影响代码运行的变动）
* refactor：重构（即不是新增功能，也不是修改bug的代码变动）
* test：增加测试
* chore：构建过程或辅助工具的变动
* 如果type为feat和fix，则该 commit 将肯定出现在 Change log 之中。<br/>

### subject
subject是 commit 目的的简短描述，不超过50个字符，且结尾不加句号（.）