import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:todoapp/provider/todo_provider.dart';
import 'package:todoapp/views/add_todo.dart';

class HomeView extends StatefulWidget {
  const HomeView({super.key});

  @override
  State<HomeView> createState() => _HomeViewState();
}

class _HomeViewState extends State<HomeView> {
  Future? _fetchDataFuture;

  @override
  void initState() {
    super.initState();
    _fetchDataFuture = Provider.of<TodoProvider>(context, listen: false).fetchData();
  }

  


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Todo"),
        centerTitle: true,
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: (){addDataWidget(context);},
        child: Icon(Icons.add),
      ),
      body: Container(
        child: Consumer<TodoProvider>(
          builder: (context, model, child) => FutureBuilder(
              future: _fetchDataFuture,
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return CircularProgressIndicator();
                } else if (snapshot.hasError) {
                  print('Error: ${snapshot.error}');
                  return Text('Error: ${snapshot.error}');
                } else if (snapshot.connectionState == ConnectionState.done) {
                  return ListView.builder(
                      itemCount: model.todoData.length,
                      itemBuilder: (context, index) {
                        return ListTile(
                          title: Text(model.todoData[index]['title']),
                          subtitle: Text(model.todoData[index]['description']),
                        );
                      });
                } else {
                  // If the Future is null, display a message to the user.
                  return Text('No data found. Please pull down to refresh.');
                }
              }),
        ),
      ),
    );
  }
}
