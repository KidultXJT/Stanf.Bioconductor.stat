"""
question.py

Objects representing homework questions.
"""

from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship, backref
from server import Base, session


class Question(Base):
    __tablename__ = 'questions'

    id = Column(Integer, primary_key=True)
    hw_id = Column(Integer, ForeignKey('hws.id'))
    questiontype = Column(String)
    points = Column(Integer)

    def score(self, answer):
        pass

    def from_xml(self, node):
        pass


class MultipleChoiceQuestion(Question):
    options = relationship("MultipleChoiceOption",
                           order_by="MultipleChoiceOption.id",
                           backref="question")

    def __init__(self, *args, **kwards):
        Question.__init__(self, *args, **kwards)
        self.questiontype = "Multiple Choice"

    def from_xml(self, node):
        pass


class MultipleChoiceOption(Base):
    __tablename__ = 'mc_options'

    id = Column(Integer, primary_key=True)
    question_id = Column(Integer, ForeignKey('questions.id'))
    order = Column(Integer)
    text = Column(String)
    correct = Column(Integer)


class ShortAnswerQuestion(Question):
    def __init__(self, *args, **kwards):
        Question.__init__(self, *args, **kwards)
        self.questiontype = "Short Answer"

    def from_xml(self, node):
        pass


class LongAnswerQuestion(Question):
    def __init__(self, *args, **kwards):
        Question.__init__(self, *args, **kwards)
        self.questiontype = "Long Answer"

    def from_xml(self, node):
        pass


def from_xml(node):
    """Constructs a question from an xml node"""

    if node.attrib['type'] == 'Multiple Choice':
        q = MultipleChoiceQuestion()
    elif node.attrib['type'] == 'Long Answer':
        q = LongAnswerQuestion()
    elif node.attrib['type'] == 'Short Answer':
        q = ShortAnswerQuestion()
    else:
        raise ValueError

    q.from_xml(node)
    q.points = int(node.attrib['points'])
    return q
