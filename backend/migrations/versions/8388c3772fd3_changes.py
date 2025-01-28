"""Changes

Revision ID: 8388c3772fd3
Revises: 8b4adce337bb
Create Date: 2025-01-27 14:53:47.004768

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8388c3772fd3'
down_revision = '8b4adce337bb'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('token_block_list',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('jti', sa.String(length=36), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('token_block_list', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_token_block_list_jti'), ['jti'], unique=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('token_block_list', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_token_block_list_jti'))

    op.drop_table('token_block_list')
    # ### end Alembic commands ###
