import MenuEntity from '../../entities/menu/menu.entity';
import MenuModel from '../../models/menu/menu.model';
import MenuRepository from '../../repositories/menu/menu.repository';
import { HttpNotFoundError, HttpForbiddenError } from '../../utils/errors/http.error';

class MenuServiceMessageCode {
  public static readonly Menu_not_found = 'Menu_Item_not_found';
  public static readonly Menu_already_exists = 'Menu_Item_already_exists'
}

class MenuService {
  private MenuRepository: MenuRepository;

  constructor(
    MenuRepository: MenuRepository,
  ) {
    this.MenuRepository = MenuRepository;
  }

  public async getMenu(): Promise<MenuModel[]> {
    const MenuEntity = await this.MenuRepository.getMenu();

    const menuModel = MenuEntity.map((Menu) => new MenuModel(Menu));

    return menuModel;
  }

  public async getMenuItem(id: string): Promise<MenuModel> {
    const MenuEntity = await this.MenuRepository.getMenuItem(id);

    if (!MenuEntity) {
      throw new HttpNotFoundError({
        msg: 'Menu not found',
        msgCode: MenuServiceMessageCode.Menu_not_found,
      });
    }

    const menuModel = new MenuModel(MenuEntity);

    return menuModel;
  }

  public async getMenuItemWithoutError(id: string): Promise<MenuEntity | null> {
    const menuEntity = await this.MenuRepository.getMenuItem(id);

    return menuEntity;
  }

  public async createMenu(data: MenuEntity): Promise<MenuModel> {
    const MenuEntityAlreadyExists = await this.getMenuItemWithoutError(data.id)
    if (MenuEntityAlreadyExists) {
      throw new HttpForbiddenError({
        msg: 'Menu already exists',
        msgCode: MenuServiceMessageCode.Menu_already_exists,
      });
    }

    const MenuEntity = await this.MenuRepository.createMenu(data);
    const menuModel = new MenuModel(MenuEntity);

    return menuModel;
  }

  public async updateMenu(id: string, data: MenuEntity): Promise<MenuModel> {
    const MenuEntity = await this.MenuRepository.updateMenu(id, data);

    if (!MenuEntity) {
      throw new HttpNotFoundError({
        msg: 'Menu not found',
        msgCode: MenuServiceMessageCode.Menu_not_found,
      });
    }

    const menuModel = new MenuModel(MenuEntity);

    return menuModel;
  }

  public async deleteMenu(id: string): Promise<void> {
    await this.MenuRepository.deleteMenu(id);
  }
}

export default MenuService;