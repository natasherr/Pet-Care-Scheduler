"""Initial migration.

Revision ID: 8b4adce337bb
Revises: 
Create Date: 2025-01-27 11:14:33.918791

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8b4adce337bb'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=128), nullable=False),
    sa.Column('email', sa.String(length=128), nullable=False),
    sa.Column('password', sa.String(length=128), nullable=False),
    sa.Column('is_verified', sa.Boolean(), nullable=True),
    sa.PrimaryKeyConstraint('user_id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('pet',
    sa.Column('pet_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=128), nullable=False),
    sa.Column('breed', sa.String(length=128), nullable=False),
    sa.Column('age', sa.Integer(), nullable=False),
    sa.Column('user', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user'], ['user.user_id'], ),
    sa.PrimaryKeyConstraint('pet_id')
    )
    op.create_table('appointment',
    sa.Column('appointment_id', sa.Integer(), nullable=False),
    sa.Column('pet', sa.Integer(), nullable=False),
    sa.Column('appointment_date', sa.DateTime(), nullable=False),
    sa.Column('type', sa.String(length=128), nullable=False),
    sa.Column('status', sa.String(length=128), nullable=False),
    sa.ForeignKeyConstraint(['pet'], ['pet.pet_id'], ),
    sa.PrimaryKeyConstraint('appointment_id')
    )
    op.create_table('routine',
    sa.Column('routine_id', sa.Integer(), nullable=False),
    sa.Column('pet', sa.Integer(), nullable=False),
    sa.Column('routine_date', sa.DateTime(), nullable=False),
    sa.Column('type', sa.String(length=128), nullable=False),
    sa.ForeignKeyConstraint(['pet'], ['pet.pet_id'], ),
    sa.PrimaryKeyConstraint('routine_id')
    )
    op.create_table('supplies',
    sa.Column('supply_id', sa.Integer(), nullable=False),
    sa.Column('pet', sa.Integer(), nullable=False),
    sa.Column('item', sa.String(length=128), nullable=False),
    sa.Column('quantity', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['pet'], ['pet.pet_id'], ),
    sa.PrimaryKeyConstraint('supply_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('supplies')
    op.drop_table('routine')
    op.drop_table('appointment')
    op.drop_table('pet')
    op.drop_table('user')
    # ### end Alembic commands ###
