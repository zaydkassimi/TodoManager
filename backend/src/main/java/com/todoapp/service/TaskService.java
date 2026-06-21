package com.todoapp.service;

import com.todoapp.dto.TaskRequest;
import com.todoapp.dto.TaskResponse;
import com.todoapp.model.Task;
import com.todoapp.model.User;
import com.todoapp.repository.TaskRepository;
import com.todoapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public List<TaskResponse> getAllTasks(Long userId) {
        return taskRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<TaskResponse> getFilteredTasks(Long userId, String filter) {
        List<Task> tasks;
        switch (filter.toLowerCase()) {
            case "active":
                tasks = taskRepository.findByUserIdAndCompletedOrderByCreatedAtDesc(userId, false);
                break;
            case "completed":
                tasks = taskRepository.findByUserIdAndCompletedOrderByCreatedAtDesc(userId, true);
                break;
            default:
                tasks = taskRepository.findByUserIdOrderByCreatedAtDesc(userId);
        }
        return tasks.stream().map(this::toResponse).collect(Collectors.toList());
    }

    public TaskResponse createTask(Long userId, TaskRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Task task = Task.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .priority(parsePriority(request.getPriority()))
                .dueDate(request.getDueDate())
                .completed(false)
                .user(user)
                .build();

        return toResponse(taskRepository.save(task));
    }

    public TaskResponse updateTask(Long userId, Long taskId, TaskRequest request) {
        Task task = taskRepository.findByIdAndUserId(taskId, userId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setPriority(parsePriority(request.getPriority()));
        task.setDueDate(request.getDueDate());

        return toResponse(taskRepository.save(task));
    }

    public void deleteTask(Long userId, Long taskId) {
        Task task = taskRepository.findByIdAndUserId(taskId, userId)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        taskRepository.delete(task);
    }

    public TaskResponse toggleComplete(Long userId, Long taskId) {
        Task task = taskRepository.findByIdAndUserId(taskId, userId)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        task.setCompleted(!task.isCompleted());
        return toResponse(taskRepository.save(task));
    }

    private Task.Priority parsePriority(String priority) {
        if (priority == null) return Task.Priority.MEDIUM;
        try {
            return Task.Priority.valueOf(priority.toUpperCase());
        } catch (IllegalArgumentException e) {
            return Task.Priority.MEDIUM;
        }
    }

    private TaskResponse toResponse(Task task) {
        return new TaskResponse(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.isCompleted(),
                task.getPriority().name(),
                task.getDueDate(),
                task.getCreatedAt()
        );
    }
}
