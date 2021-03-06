'use strict';

(function () {
    angular.module('starter')
        .factory('dbFactory', dbFactoryFunc);

        function dbFactoryFunc(){
            var db = openDatabase('siteDiaryDB', '1.0', 'siteDiaryDB', 2*1024*1024);
            

            var _createTbl = function(tblName, fieldArr){
                var fieldStr = fieldArr.join(',');
                db.transaction(function(tx){
                    tx.executeSql('CREATE TABLE IF NOT EXISTS ' + tblName + ' ('+ fieldStr +')' );
                });
            }

            var _dropTbl = function(tblName){
                console.log('drop');
                db.transaction(function(tx){
                    tx.executeSql('DROP TABLE '+tblName);
                });
            }

            var _save = function(tblName, dataObj){
                db.transaction(function(tx){
                    var saveStr = "(",
                        saveStrQ = "(",
                        saveArr = [];
                    for(var i in dataObj){
                        saveStr += (i +",");
                        saveStrQ += '?,';
                        saveArr.push(dataObj[i]);
                    }
                    saveStr = saveStr.substring(0, saveStr.length-1)+')';
                    saveStrQ = saveStrQ.substring(0, saveStrQ.length-1)+')';
                    var insertStr = 'INSERT INTO '+tblName+' '+saveStr+' VALUES '+saveStrQ;
                    // console.log('saveStr:'+saveStr);
                    // console.log('saveStrQ:'+saveStrQ);
                    // console.log('insertStr:'+insertStr);
                    // console.log('saveArr:'+saveArr);
                    // console.log('type saveArr:'+ Array.isArray(saveArr));
                    //dbFactory.save('test', { aa:'123aaa' });
                    tx.executeSql(insertStr, saveArr);
                    //tx.executeSql('INSERT INTO test (aa) VALUES (?)', ['123aaa']);
                });
            }

            var _find = function(tblName, condiObj, successCb, errorCb){
                var rowArr = [];
                var condiStr = "";
                for(var iCondi in condiObj){
                    condiStr += (iCondi +" = " + condiObj[iCondi]);
                }

                db.transaction(function(tx){
                    tx.executeSql('SELECT * FROM '+ tblName + ' WHERE ' + condiStr, [], function(tx, results){
                        var rowLen = results.rows.length,i;
                        for(i=0; i<rowLen; i++){
                            // console.log('results.rows.item(i)'+results.rows.item(i));
                            rowArr.push(results.rows.item(i));
                        }
                        // console.log('rowArr:'+rowArr);
                        if(successCb){
                            successCb(rowArr);
                        }
                    }, function(){
                        if(errorCb){
                            errorCb();
                        }
                    });
                 });
                
            }

            var _findAll = function(tblName, successCb, errorCb){
                var rowArr = [];
                db.transaction(function(tx){
                    tx.executeSql('SELECT * FROM '+tblName, [], function(tx, results){
                        var rowLen = results.rows.length,i;
                        for(i=0; i<rowLen; i++){
                            // console.log('results.rows.item(i)'+results.rows.item(i));
                            rowArr.push(results.rows.item(i));
                        }
                        // console.log('rowArr:'+rowArr);
                        if(successCb){
                            successCb(rowArr);
                        }
                    }, function(){
                        if(errorCb){
                            errorCb();
                        }
                    });
                 });
                
            }

            var _findAll_OrderByCnt = function(tblName, successCb, errorCb){
                var rowArr = [];
                db.transaction(function(tx){
                    tx.executeSql('SELECT * FROM '+ tblName + ' ORDER BY uploadCnt, rowid ASC', [], function(tx, results){
                        var rowLen = results.rows.length,i;
                        for(i=0; i<rowLen; i++){
                            // console.log('results.rows.item(i)'+results.rows.item(i));
                            rowArr.push(results.rows.item(i));
                        }
                        // console.log('rowArr:'+rowArr);
                        if(successCb){
                            successCb(rowArr);
                        }
                    }, function(){
                        if(errorCb){
                            errorCb();
                        }
                    });
                 });
                
            }

            var _update = function(tblName, setObj, condiObj, successCb, errorCb){
                var setStr = "",
                    condiStr = "";
                for(var iSet in setObj){
                    //setStr += (iSet + " = \""+ setObj[iSet] +"\",");
                    if(typeof setObj[iSet] ==="number" ){
                        setStr +=  (iSet + " = "+ setObj[iSet] +",");
                    }else{
                        setStr += (iSet + " = "+"\'"+ setObj[iSet] +"\'"+",");
                    }
                    
                }
                setStr = setStr.substring(0, setStr.length-1);
                for(var iCondi in condiObj){
                    condiStr += (iCondi +" = "+condiObj[iCondi]);
                }
                //var updateStr = 'UPDATE '+tblName+' SET '+setStr+' WHERE '+ condiStr;
                var updateStr = "UPDATE "+tblName+" SET "+setStr+" WHERE "+ condiStr;
                console.log(updateStr);
                // console.log('updateStr:'+updateStr);
                //var testStr = 'UPDATE fe_Activity SET projectId = 354, description = "dsasdafda" WHERE ActivityId = 0';
                /*db.transaction(function(tx){
                    tx.executeSql(testStr, [], function(){
                        console.log('db update success');
                    },function(){
                        console.log('db update fail');
                    })
                });*/
                db.transaction(function(tx){
                    tx.executeSql(updateStr, [], function(){
                    // tx.executeSql('UPDATE fe_Activity SET ActivityId = 123 WHERE ActivityId = 2', [], function(){
                        console.log('update succe');
                        if(successCb){
                            successCb();
                        }
                    },function(){
                        console.log('update fail');
                        if(errorCb){
                            errorCb();
                        }
                    });
                });
            }

            var _delete = function(tblName, condiObj, successCb, errorCb){
                var condiStr = "";
                for(var iCondi in condiObj){
                    condiStr += (iCondi +" = "+condiObj[iCondi]);
                }
                db.transaction(function(tx){
                    //tx.executeSql('DELETE FROM fe_Activity WHERE ActivityId = 123',[],function(){
                    tx.executeSql('DELETE FROM '+tblName+' WHERE '+condiStr,[],function(){
                        console.log('delete success');
                        if(successCb){
                            successCb();
                        }
                    },function(){
                        console.log('delete fail');
                        if(errorCb){
                            errorCb();
                        }
                    })
                    //tx.executeSql('DELETE FROM '+tblName+' WHERE '+condiStr);
                });
            }
            /*var _deletePhoto = function(tblName, condiObj, k){
                var condiStr = "";
                for(var iCondi in condiObj){
                    condiStr += (iCondi +" = "+condiObj[iCondi]);
                }
                db.transaction(function(tx){
                    //tx.executeSql('DELETE FROM fe_Activity WHERE ActivityId = 123',[],function(){
                    tx.executeSql('DELETE FROM '+tblName+' WHERE '+condiStr,[],function(){
                        console.log('delete success');
                    },function(){
                        console.log('delete fail');
                    })
                    //tx.executeSql('DELETE FROM '+tblName+' WHERE '+condiStr);
                });
            }*/

            return {
                createTbl          : _createTbl,
                save               : _save,
                dropTbl            : _dropTbl,
                find               : _find,
                findAll            : _findAll,
                findAll_OrderByCnt : _findAll_OrderByCnt,
                update             : _update,
                delete             : _delete,
                //deletePhoto:_deletePhoto,
            }
        }
})();

