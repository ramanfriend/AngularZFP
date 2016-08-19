# AngularZFP

Go to ..\mongo\bin path from terminal.

To start MOngoDdb server > mongod

open a new Terminal and Go to ..\mongo\bin>
Type:-

..\mongo\bin>mongo

create db with:- use command

>use searchlist

Insert Records In DB.

>db.searchlist.insert({name:'Prasad Patil',dob:'12/12/2016',contact:'987654321',city:'Mumbai',description:'test',accession:'test',dicomfile:"IM-0001-0001.dcm"})


db.searchlist.insert({name:'Prasad Patil',dob:'12/12/2016',contact:'987654321',city:'Mumbai',description:'test',accession:'test',dicomfile:"IM-0001-0002.dcm"})

See searchlist:-
>db.searchlist.find().pretty()