from langchain_community.utilities import SQLDatabase
from devlog.settings import env

import os
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, SystemMessage


class LangChainService:

    def __init__(self):
        self.model = "gpt-4o-mini"

    def initialize_db(self):
        try:
            username = env('DB_USER')
            password = env('DB_PASSWORD')
            host = env('DB_HOST')
            database = env('DB_NAME')
            os.environ["OPENAI_API_KEY"] = env("OPENAI_API_KEY")

            db = SQLDatabase.from_uri(
                f"mysql+pymysql://{username}:{password}@{host}/{database}"
            )

            return db

        except Exception as e:
            raise ValueError(f"Error Occurred while loading db: {str(e)}")

    def get_response_for_prompt(self, user_prompt):

        messages = [
            SystemMessage(content="You're a helpful assistant"),
            HumanMessage(content=user_prompt),
        ]

        llm = ChatOpenAI(
            model="gpt-4o-mini",
            temperature=0,
            max_tokens=500,
        )
        msg = llm.invoke(messages)
        print(msg.response_metadata)

        return msg.content




