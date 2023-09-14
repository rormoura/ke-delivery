import MenuEntity from '../../entities/menu/menu.entity';
import BaseRepository from '../base.repository';

class MenuRepository extends BaseRepository<MenuEntity> {
  constructor() {
    super('menu');
  }

  public async getMenu(): Promise<MenuEntity[]> {
    return await this.findAll();
  }

  public async getMenuItem(id: string): Promise<MenuEntity | null> {
    return await this.findOne((item) => item.id === id);
  }

  public async createMenu(data: MenuEntity): Promise<MenuEntity> {
    return await this.add(data);
  }

  public async updateMenu(
    id: string,
    data: MenuEntity
  ): Promise<MenuEntity | null> {
    return await this.update((item) => item.id === id, data);
  }

  public async deleteMenu(id: string): Promise<void> {
    await this.delete((item) => item.id !== id);
  }
}

export default MenuRepository;