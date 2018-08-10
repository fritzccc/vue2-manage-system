/*
 * Copyright 2010-2016 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *  http://aws.amazon.com/apache2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

var apigClientFactory = {};
apigClientFactory.newClient = function (config) {
    var apigClient = { };
    if(config === undefined) {
        config = {
            accessKey: '',
            secretKey: '',
            sessionToken: '',
            region: '',
            apiKey: undefined,
            defaultContentType: 'application/json',
            defaultAcceptType: 'application/json'
        };
    }
    if(config.accessKey === undefined) {
        config.accessKey = '';
    }
    if(config.secretKey === undefined) {
        config.secretKey = '';
    }
    if(config.apiKey === undefined) {
        config.apiKey = '';
    }
    if(config.sessionToken === undefined) {
        config.sessionToken = '';
    }
    if(config.region === undefined) {
        config.region = 'us-east-1';
    }
    //If defaultContentType is not defined then default to application/json
    if(config.defaultContentType === undefined) {
        config.defaultContentType = 'application/json';
    }
    //If defaultAcceptType is not defined then default to application/json
    if(config.defaultAcceptType === undefined) {
        config.defaultAcceptType = 'application/json';
    }

    
    // extract endpoint and path from url
    var invokeUrl = 'http://localhost:3003';
    var endpoint = /(^https?:\/\/[^\/]+)/g.exec(invokeUrl)[1];
    var pathComponent = invokeUrl.substring(endpoint.length);

    var sigV4ClientConfig = {
        accessKey: config.accessKey,
        secretKey: config.secretKey,
        sessionToken: config.sessionToken,
        serviceName: 'execute-api',
        region: config.region,
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var authType = 'NONE';
    if (sigV4ClientConfig.accessKey !== undefined && sigV4ClientConfig.accessKey !== '' && sigV4ClientConfig.secretKey !== undefined && sigV4ClientConfig.secretKey !== '') {
        authType = 'AWS_IAM';
    }

    var simpleHttpClientConfig = {
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var apiGatewayClient = apiGateway.core.apiGatewayClientFactory.newClient(simpleHttpClientConfig, sigV4ClientConfig);
    
    
    
    apigClient.reloApiVer100ChangepassPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var reloApiVer100ChangepassPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/relo-api/ver1_0_0/changepass').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(reloApiVer100ChangepassPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.reloApiVer100ChangepassOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var reloApiVer100ChangepassOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/relo-api/ver1_0_0/changepass').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(reloApiVer100ChangepassOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.reloApiVer100CsvFilesPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var reloApiVer100CsvFilesPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/relo-api/ver1_0_0/csv/files').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(reloApiVer100CsvFilesPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.reloApiVer100CsvFilesOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var reloApiVer100CsvFilesOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/relo-api/ver1_0_0/csv/files').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(reloApiVer100CsvFilesOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.reloApiVer100CsvLogsPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var reloApiVer100CsvLogsPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/relo-api/ver1_0_0/csv/logs').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(reloApiVer100CsvLogsPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.reloApiVer100CsvLogsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var reloApiVer100CsvLogsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/relo-api/ver1_0_0/csv/logs').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(reloApiVer100CsvLogsOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.reloApiVer100DownloadsListPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var reloApiVer100DownloadsListPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/relo-api/ver1_0_0/downloads/list').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(reloApiVer100DownloadsListPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.reloApiVer100DownloadsListOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var reloApiVer100DownloadsListOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/relo-api/ver1_0_0/downloads/list').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(reloApiVer100DownloadsListOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.reloApiVer100DownloadsTempurlPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var reloApiVer100DownloadsTempurlPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/relo-api/ver1_0_0/downloads/tempurl').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(reloApiVer100DownloadsTempurlPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.reloApiVer100DownloadsTempurlOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var reloApiVer100DownloadsTempurlOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/relo-api/ver1_0_0/downloads/tempurl').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(reloApiVer100DownloadsTempurlOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.reloApiVer100FilesCommentsPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var reloApiVer100FilesCommentsPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/relo-api/ver1_0_0/files/comments').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(reloApiVer100FilesCommentsPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.reloApiVer100FilesCommentsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var reloApiVer100FilesCommentsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/relo-api/ver1_0_0/files/comments').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(reloApiVer100FilesCommentsOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.reloApiVer100FilesCommentsDeletePost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var reloApiVer100FilesCommentsDeletePostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/relo-api/ver1_0_0/files/comments/delete').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(reloApiVer100FilesCommentsDeletePostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.reloApiVer100FilesCommentsDeleteOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var reloApiVer100FilesCommentsDeleteOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/relo-api/ver1_0_0/files/comments/delete').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(reloApiVer100FilesCommentsDeleteOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.reloApiVer100FilesDeletePost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var reloApiVer100FilesDeletePostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/relo-api/ver1_0_0/files/delete').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(reloApiVer100FilesDeletePostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.reloApiVer100FilesDeleteOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var reloApiVer100FilesDeleteOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/relo-api/ver1_0_0/files/delete').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(reloApiVer100FilesDeleteOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.reloApiVer100FilesDownloadPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var reloApiVer100FilesDownloadPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/relo-api/ver1_0_0/files/download').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(reloApiVer100FilesDownloadPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.reloApiVer100FilesDownloadOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var reloApiVer100FilesDownloadOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/relo-api/ver1_0_0/files/download').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(reloApiVer100FilesDownloadOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.reloApiVer100FilesDownloadzipPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var reloApiVer100FilesDownloadzipPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/relo-api/ver1_0_0/files/downloadzip').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(reloApiVer100FilesDownloadzipPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.reloApiVer100FilesDownloadzipOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var reloApiVer100FilesDownloadzipOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/relo-api/ver1_0_0/files/downloadzip').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(reloApiVer100FilesDownloadzipOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.reloApiVer100FilesFolderPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var reloApiVer100FilesFolderPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/relo-api/ver1_0_0/files/folder').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(reloApiVer100FilesFolderPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.reloApiVer100FilesFolderOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var reloApiVer100FilesFolderOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/relo-api/ver1_0_0/files/folder').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(reloApiVer100FilesFolderOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.reloApiVer100FilesInfoPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var reloApiVer100FilesInfoPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/relo-api/ver1_0_0/files/info').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(reloApiVer100FilesInfoPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.reloApiVer100FilesInfoOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var reloApiVer100FilesInfoOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/relo-api/ver1_0_0/files/info').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(reloApiVer100FilesInfoOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.reloApiVer100FilesListPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var reloApiVer100FilesListPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/relo-api/ver1_0_0/files/list').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(reloApiVer100FilesListPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.reloApiVer100FilesListOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var reloApiVer100FilesListOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/relo-api/ver1_0_0/files/list').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(reloApiVer100FilesListOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.reloApiVer100FilesLoadPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var reloApiVer100FilesLoadPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/relo-api/ver1_0_0/files/load').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(reloApiVer100FilesLoadPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.reloApiVer100FilesLoadOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var reloApiVer100FilesLoadOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/relo-api/ver1_0_0/files/load').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(reloApiVer100FilesLoadOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.reloApiVer100FilesPreviewPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var reloApiVer100FilesPreviewPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/relo-api/ver1_0_0/files/preview').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(reloApiVer100FilesPreviewPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.reloApiVer100FilesPreviewOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var reloApiVer100FilesPreviewOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/relo-api/ver1_0_0/files/preview').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(reloApiVer100FilesPreviewOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.reloApiVer100FilesUploadPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var reloApiVer100FilesUploadPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/relo-api/ver1_0_0/files/upload').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(reloApiVer100FilesUploadPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.reloApiVer100FilesUploadOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var reloApiVer100FilesUploadOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/relo-api/ver1_0_0/files/upload').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(reloApiVer100FilesUploadOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.reloApiVer100FilesUploadTempurlPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var reloApiVer100FilesUploadTempurlPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/relo-api/ver1_0_0/files/upload/tempurl').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(reloApiVer100FilesUploadTempurlPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.reloApiVer100FilesUploadTempurlOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var reloApiVer100FilesUploadTempurlOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/relo-api/ver1_0_0/files/upload/tempurl').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(reloApiVer100FilesUploadTempurlOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.reloApiVer100ForgotpassPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var reloApiVer100ForgotpassPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/relo-api/ver1_0_0/forgotpass').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(reloApiVer100ForgotpassPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.reloApiVer100ForgotpassOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var reloApiVer100ForgotpassOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/relo-api/ver1_0_0/forgotpass').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(reloApiVer100ForgotpassOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.reloApiVer100SigninPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var reloApiVer100SigninPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/relo-api/ver1_0_0/signin').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(reloApiVer100SigninPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.reloApiVer100SigninOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var reloApiVer100SigninOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/relo-api/ver1_0_0/signin').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(reloApiVer100SigninOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.reloApiVer100SignoutPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var reloApiVer100SignoutPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/relo-api/ver1_0_0/signout').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(reloApiVer100SignoutPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.reloApiVer100SignoutOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var reloApiVer100SignoutOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/relo-api/ver1_0_0/signout').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(reloApiVer100SignoutOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.reloApiVer100TreePost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var reloApiVer100TreePostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/relo-api/ver1_0_0/tree').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(reloApiVer100TreePostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.reloApiVer100TreeOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var reloApiVer100TreeOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/relo-api/ver1_0_0/tree').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(reloApiVer100TreeOptionsRequest, authType, additionalParams, config.apiKey);
    };
    

    return apigClient;
};
