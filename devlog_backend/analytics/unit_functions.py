from analytics.pydantic_models import ProjectBase, NoteBase, TaskBase
from note_management.models import Note, Tag
from task_management.models import Task, Project

MODEL_REGISTRY = {
    'task': Task,
    'project': Project,
    'note': Note,
    'tag': Tag
}

PYDANTIC_MODEL_REGISTRY = {
    Task : TaskBase,
    Project: ProjectBase,
    Note: NoteBase,
}


def create_object(model, user_id, **kwargs):
    """
    General utility function to create an object for a specific model.

    Args:
    - model: The model class (Task, Project, etc.)
    - user: The user for whom the object is being created.
    - kwargs: The fields for the model (title, status, due_date, etc.)

    Returns:
    - object: The created object instance.
    """
    kwargs['user_id'] = user_id
    obj = model.objects.create(**kwargs)
    return obj