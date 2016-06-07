package org.one.xingyun.user.repository;

import org.one.xingyun.user.domain.Task;
import org.springframework.data.repository.PagingAndSortingRepository;


public interface TaskRepository extends PagingAndSortingRepository<Task,Long> {

}
