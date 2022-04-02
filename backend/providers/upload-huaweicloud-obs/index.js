"use strict"


// const config = require('@strapi/strapi/lib/core/registries/config');
// 引入obs库
// 使用npm安装
const ObsClient = require('esdk-obs-nodejs');
var fs = require('fs');

// 创建ObsClient实例

module.exports = {
    init(providerOptions) {
        // init your provider if necessary
        
        var obsClient = new ObsClient({
            access_key_id: providerOptions.accessKeyId,
            secret_access_key: providerOptions.secretAccessKey,
            server: providerOptions.server
        });



        function getPath(file) {
            let prefix = providerOptions.prefix || "";
            prefix = prefix.trim() === "/" ? "" : prefix.trim(); // prefix only if not root
            const path = file.path ? `${file.path}/` : "";
            return `${prefix}${path}${file.hash}${file.ext}`;
        }


        return {
            upload(file, customParams= {}) {
                // upload the file in the provider
                console.log("file", file)
                console.log("buffer", Buffer.from(file.buffer, "binary"))
                const uploadParams = {
                    Bucket: providerOptions.params.bucket,
                    Key: getPath(file),
                    // Body: Buffer.from(file.buffer, "binary"),
                    Body: file.getStream(),
                    // SourceFile: file.tmpWorkingDirectory,
                    // TODO(fix): this currently breaks uploads
                    // ACL: ObsClient.enums.AclPublicRead,
                    ACL: "public-read",
                    ContentType: file.mime,
                    ...customParams,
                };
                obsClient.putObject(
                    uploadParams, (err, result) => {
                        if(err){
                               console.error('Error-->' + err);
                        }else{
                               if(result.CommonMsg.Status < 300){
                                      console.log('RequestId-->' + result.InterfaceResult.RequestId);
                                      console.log('ETag-->' + result.InterfaceResult.ETag);
                                      console.log('VersionId-->' + result.InterfaceResult.VersionId);
                                      console.log('StorageClass-->' + result.InterfaceResult.StorageClass);
                               }else{
                                console.log('Status-->' + result.CommonMsg.Status);
                                      console.log('Code-->' + result.CommonMsg.Code);
                                      console.log('Message-->' + result.CommonMsg.Message);
                               }
                        }
                 }
                )
            },
            delete(file, customParams={}) {
                // delete the file in the provider
                obsClient.deleteObject({
                    Bucket: providerOptions.params.bucket,
                    Key: getPath(file)
                }, (err, result) => {
                    if (err) {
                        console.error('Error-->' + err);
                    } else {
                        console.log('Status-->' + result.CommonMsg.Status);
                    }
                });

            },
        };
    },
};

// 使用访问OBS

// 关闭obsClient
// obsClient.close();