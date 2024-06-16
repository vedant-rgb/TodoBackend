import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class TodoProvider extends ChangeNotifier {
  final httpClient = http.Client();
  List<dynamic> todoData = [];
  Map<String, String> customHeaders = {
    "Accept": "application/json",
    "Content-type": "application/json;charset=UTF-8"
  };

  //Get Request
  Future fetchData() async {
    final restAPIURL = Uri.parse("https://flutterbackend-dgd9.onrender.com/");
    http.Response response = await httpClient.get(restAPIURL);
    final Map parsedData = await json.decode(response.body.toString());
    todoData = parsedData[
        "data"]; //see our response on postman as it is under data so data is used
    print(todoData);
  }

  //Post Request
  Future addData(Map<String,String> body) async {
    final restAPIURL =
        Uri.parse("https://flutterbackend-dgd9.onrender.com/add");
    http.Response response = await httpClient.post(restAPIURL,
        headers: customHeaders, body: jsonEncode(body));
    
    return response.body;
  }

  //Delete Request
  Future deleteData()async{
    final restAPIURL =
        Uri.parse("https://flutterbackend-dgd9.onrender.com/delete");
    http.Response response = await httpClient.delete(restAPIURL,headers: customHeaders,
      body: {
        
      }
    );
 
  }

}
