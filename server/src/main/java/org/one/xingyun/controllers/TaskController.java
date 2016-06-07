package org.one.xingyun.controllers;


import org.one.xingyun.user.domain.Task;
import org.one.xingyun.user.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class TaskController {

  @Autowired
  private TaskRepository taskRepository;

  public void add(Task task){
    taskRepository.save(task);
  }



}
