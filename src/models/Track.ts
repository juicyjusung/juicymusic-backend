import { DataTypes, Sequelize } from 'sequelize';
import { TrackStatic } from '../interfaces/api-rest';

export function TrackFactory(sequelize: Sequelize): TrackStatic {
  return <TrackStatic>sequelize.define(
    'tracks',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      artist: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      album: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      albumArtPath: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      filePath: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      underscored: false,
      modelName: 'Track',
      tableName: 'tracks',
      paranoid: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    }
  );
}
